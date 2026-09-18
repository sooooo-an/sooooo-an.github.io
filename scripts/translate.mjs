#!/usr/bin/env node
/**
 * scripts/translate.mjs
 *
 * 한국어 콘텐츠(src/content/**)를 OpenAI API로 영어로 자동 번역해
 * src/content-en/** 에 미러링하는 스크립트.
 *
 * 정책: "변경 감지 기반 재번역"
 *   - src/content/<category>/<slug>.mdx 의 내용을 해시(sha256)로 계산해서
 *     content-en 쪽 frontmatter의 sourceHash 와 비교한다.
 *   - content-en 파일이 없거나, sourceHash 가 현재 한국어 원문 해시와 다르면 번역 대상.
 *   - 즉 한국어 원문을 나중에 수정하면 그 글도 다시 번역된다(신규 글도 당연히 포함).
 *   - 번역 결과 frontmatter에는 sourceHash 를 기록해서 다음 실행 시 변경 여부를 판단한다.
 *
 * 사용법:
 *   로컬 실행: 프로젝트 루트에 .env.local 파일을 만들고 OPENAI_API_KEY=sk-... 작성 후
 *     npm run translate
 *   (.env.local 은 .gitignore 에 포함되어 있어 커밋되지 않음)
 *
 *   CI(GitHub Actions) 실행: 워크플로에서 OPENAI_API_KEY 환경변수를 주입한 뒤
 *     node scripts/translate.mjs 로 직접 실행 (.env.local 불필요).
 *
 * 필요 환경변수:
 *   OPENAI_API_KEY  (필수) - 없으면 즉시 에러 메시지와 함께 exit 1
 *   OPENAI_MODEL    (선택) - 기본값 'gpt-4o-mini'
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

// .env.local 이 존재할 때만 로드 (없으면 조용히 스킵 — CI 환경에선 보통 없음)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const envLocalPath = path.join(projectRoot, ".env.local");
if (fs.existsSync(envLocalPath)) {
  const dotenv = await import("dotenv");
  dotenv.config({ path: envLocalPath });
}

const CATEGORIES = ["projects", "tech", "review", "thoughts"];
const CONTENT_DIR = path.join(projectRoot, "src", "content");
const CONTENT_EN_DIR = path.join(projectRoot, "src", "content-en");

const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// 원본 값을 그대로 유지해야 하는 구조적 frontmatter 필드
const STRUCTURAL_FIELDS = [
  "slug",
  "category",
  "date",
  "draft",
  "featured",
  "order",
];

const SYSTEM_PROMPT = `You are a professional translator who translates Korean developer
portfolio and blog posts into natural, fluent English.

Rules:
- Preserve the Markdown/MDX structure exactly (heading levels, lists, bold text, links,
  code blocks, mermaid blocks) and translate only the human-readable text.
- Do NOT translate the code itself inside code blocks (text wrapped in \`\`\`); comments
  inside code blocks may be translated.
- In the frontmatter object (given as JSON), translate only human-readable string and
  string-array values (e.g. title, description, summary, tags, stack, proves). Leave
  structural/numeric/boolean/date values such as slug, category, date, draft, featured,
  order completely unchanged. Fields like role/period that are already in English or are
  mostly numeric should be kept natural, lightly polished into idiomatic English if useful.
- Respond ONLY with a JSON object of the exact shape:
  {"data": { ...translated frontmatter... }, "content": "...translated MDX body..."}`;

function hashSource(raw) {
  return crypto.createHash("sha256").update(raw, "utf-8").digest("hex");
}

function findMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

function collectTranslationTargets() {
  const targets = [];
  for (const category of CATEGORIES) {
    const srcCategoryDir = path.join(CONTENT_DIR, category);
    const files = findMdxFiles(srcCategoryDir);
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const srcPath = path.join(srcCategoryDir, file);
      const enPath = path.join(CONTENT_EN_DIR, category, file);

      const srcRaw = fs.readFileSync(srcPath, "utf-8");
      const currentHash = hashSource(srcRaw);

      if (fs.existsSync(enPath)) {
        const enRaw = fs.readFileSync(enPath, "utf-8");
        const { data: enData } = matter(enRaw);
        if (enData.sourceHash === currentHash) {
          continue; // 원문 변경 없음 -> skip
        }
      }

      targets.push({ category, slug, srcPath, enPath, srcRaw, currentHash });
    }
  }
  return targets;
}

async function translateOne({ data, content }) {
  const userPayload = JSON.stringify({ data, content });

  const res = await fetch(OPENAI_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPayload },
      ],
    }),
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "");
    throw new Error(
      `OpenAI API request failed: ${res.status} ${res.statusText} ${bodyText}`
    );
  }

  const json = await res.json();
  const messageContent = json?.choices?.[0]?.message?.content;
  if (!messageContent) {
    throw new Error("OpenAI API response did not contain message content");
  }

  let parsed;
  try {
    parsed = JSON.parse(messageContent);
  } catch (err) {
    throw new Error(`Failed to parse OpenAI response JSON: ${err.message}`);
  }

  if (!parsed || typeof parsed !== "object" || !("data" in parsed) || !("content" in parsed)) {
    throw new Error("OpenAI response JSON missing required 'data'/'content' keys");
  }

  return parsed;
}

function finalizeData(translatedData, originalData, sourceHash) {
  const merged = { ...translatedData };
  for (const key of STRUCTURAL_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(originalData, key)) {
      merged[key] = originalData[key];
    }
  }
  merged.sourceHash = sourceHash;
  return merged;
}

async function main() {
  if (!process.env.OPENAI_API_KEY) {
    console.error(
      "[translate] ERROR: OPENAI_API_KEY 환경변수가 설정되어 있지 않습니다. " +
        "로컬에서는 .env.local 에 OPENAI_API_KEY=sk-... 를 설정하거나, " +
        "CI에서는 워크플로 secrets 로 주입해주세요."
    );
    process.exit(1);
  }

  const targets = collectTranslationTargets();

  if (targets.length === 0) {
    console.log("[translate] 번역할 변경/신규 콘텐츠 없음");
    process.exit(0);
  }

  console.log(`[translate] 번역 대상 ${targets.length}개 발견:`);
  for (const t of targets) {
    console.log(`  - ${t.category}/${t.slug}.mdx`);
  }

  const translated = [];
  const failed = [];

  for (const target of targets) {
    try {
      const { data, content } = matter(target.srcRaw);

      const result = await translateOne({ data, content });
      const translatedData = finalizeData(
        result.data ?? {},
        data,
        target.currentHash
      );
      const translatedContent = result.content ?? content;

      const outString = matter.stringify(translatedContent, translatedData);

      const enCategoryDir = path.dirname(target.enPath);
      fs.mkdirSync(enCategoryDir, { recursive: true });
      fs.writeFileSync(target.enPath, outString, "utf-8");

      translated.push(target);
      console.log(`[translate] OK: ${target.category}/${target.slug}.mdx`);
    } catch (err) {
      failed.push(target);
      console.error(
        `[translate] FAILED: ${target.category}/${target.slug}.mdx - ${err.message}`
      );
    }
  }

  console.log(
    `[translate] 요약: 총 ${targets.length}개 대상 중 ${translated.length}개 번역 성공, ${failed.length}개 실패`
  );

  if (translated.length === 0 && failed.length > 0) {
    console.error("[translate] 모든 대상 번역 실패");
    process.exit(1);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(`[translate] 예기치 않은 오류: ${err.stack || err.message}`);
  process.exit(1);
});
