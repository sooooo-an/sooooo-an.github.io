# CLAUDE.md

이 파일은 이 저장소에서 작업하는 Claude(또는 다른 AI 코딩 에이전트)를 위한 프로젝트 메모입니다.

## 프로젝트 개요

안수경(sooooo-an)의 개인 포트폴리오 사이트. Next.js 16(App Router) + TypeScript +
Tailwind CSS v4 + MDX 기반 정적 사이트이며, `output: 'export'` 로 빌드해
GitHub Pages(`https://sooooo-an.github.io`, 레포 `sooooo-an/sooooo-an.github.io`)에 배포한다.

디자인은 https://wormwlrm.github.io 를 참고해 만들었다 (중앙 정렬 단일 컬럼,
Pretendard 폰트, 번호 매김 리스트형 글/프로젝트 목록). 포인트 컬러는 플럼 계열
(`--color-accent`, 라이트 `#6B3FA0` / 다크 `#A57FDB`, `src/app/globals.css`).

## 라우트 구조

- 한국어(기본, prefix 없음): `/`, `/projects`, `/projects/[slug]`, `/writing`,
  `/writing/[slug]`, `/about`, `/resume`
- 영어(`/en` prefix): `src/app/en/` 아래 동일 구조 미러링
- **한국어 URL 구조는 절대 바꾸지 말 것.** 이미 배포되어 Giscus 댓글이 `data-mapping="pathname"`
  으로 이 경로에 매핑되어 있음 (`src/lib/site.ts` 의 `giscus` 설정, `src/components/Giscus.tsx`).
- 페이지 렌더 로직은 `src/components/pages/*Page.tsx` 에 두고, `src/app/**/page.tsx` 는
  `locale="ko"` / `locale="en"` 을 넘기는 얇은 wrapper로 구성.

## 콘텐츠

- 한국어 원문: `src/content/{projects,tech,review,thoughts}/*.mdx`
- 영문 번역본(자동 생성): `src/content-en/{projects,tech,review,thoughts}/*.mdx` — **직접 수정 가능하지만
  다음 자동 번역 실행 시 한국어 원문이 바뀌지 않았다면 덮어써지지 않음** (아래 "자동 번역" 참고)
- Writing 카테고리는 정확히 3개만 유지: 기술(tech) / 서평(review) / 개인생각(thoughts).
  라벨 매핑은 `src/lib/categories.ts`, `src/lib/i18n/dictionary.ts` 참고.
- 글 frontmatter: `title, date, description, category, tags[], featured, draft`
- 프로젝트 frontmatter: `title, summary, role, period, stack[], proves[], featured, order`
- 콘텐츠 로딩/파싱은 `src/lib/content.ts` (`getAllPosts`, `getPostBySlug`, `getAllProjects`,
  `getProjectBySlug`, `getAdjacentPosts`, 전부 `locale: 'ko' | 'en' = 'ko'` 파라미터 지원).

## 자동 번역 (Google Gemini API)

`.github/workflows/translate.yml` + `scripts/translate.mjs`.

- 한국어 원문의 sha256 해시를 영문 파일 frontmatter의 `sourceHash` 에 저장해두고 비교한다.
  `content-en` 파일이 없거나 해시가 다르면(=원문이 새로 추가되었거나 수정되었으면) 재번역한다.
- `main` 브랜치에 `src/content/**/*.mdx` 변경이 포함된 push가 있으면 워크플로가 돌아
  Gemini API로 번역하고 `github-actions[bot]` 명의로 커밋·푸시한다. 그 커밋이 다시
  `deploy.yml` 을 트리거해 배포까지 이어진다.
- 무한루프 방지: `translate.yml` 은 `github.actor != 'github-actions[bot]'` 조건으로
  봇 자신의 커밋에는 반응하지 않는다.
- 리포지토리 시크릿 `GEMINI_API_KEY` 필요 (https://aistudio.google.com/apikey 에서 무료 발급) (Settings → Secrets and variables → Actions).
- 로컬 테스트: 루트에 `.env.local` 만들고 `GEMINI_API_KEY=AIza...` 작성 후 `npm run translate`.
- 자세한 내용은 `README.md` "자동 번역" 섹션 참고.

## 선택 기능 통합

- **Giscus 댓글**: `src/lib/site.ts` 의 `giscus` 설정값 사용. repo/repoId/category/categoryId
  이미 채워져 있음 (GitHub Discussions 기반).
- **Umami Analytics**: `src/lib/site.ts` 의 `analytics.umamiWebsiteId` / `umamiSrc`.
- **Pagefind 검색**: `npm run build` 의 `postbuild` 단계에서 인덱싱. `src/components/Search.tsx` 에서
  `data-pagefind-filter="lang:ko|en"` 기준으로 로케일별 필터링.
- **SEO**: JSON-LD(`src/lib/jsonld.ts`), canonical/hreflang(`src/lib/site.ts` 의 `alternatesFor`),
  ko/en sitemap(`scripts/generate-static-files.mjs`, `prebuild` 단계에서 `public/sitemap.xml` 생성).
- **OG 이미지**: `next/og` `ImageResponse` 사용, 한국어 루트/프로젝트/글 상세에만 있고 `/en/*` 에는 없음.

## 배포

`.github/workflows/deploy.yml` — `main` push 시 `npm run build` (prebuild: sitemap/robots 생성,
postbuild: pagefind 인덱싱) → `out/` 를 GitHub Pages에 업로드·배포. 레포 Settings → Pages →
Source 는 **GitHub Actions** 로 설정되어 있어야 함.

## 작업 시 반드시 지킬 것

1. **커밋 메시지에 Claude/AI 관련 서명 줄(Co-Authored-By, Claude-Session 등)을 넣지 않는다.**
   conventional commit 스타일의 순수 메시지만 사용한다.
2. 이 저장소는 `output: 'export'` 정적 사이트다. 서버 런타임 기능(route handler, ISR, middleware,
   dynamic rendering)은 쓸 수 없다.
3. 로컬 개발 환경은 사용자의 맥북(원격 디바이스 브릿지)이며, git remote가 SSH(`git@github-personal:...`)로
   설정되어 있어 일부 실행 환경에서는 `git push` 가 막힐 수 있다 — 그 경우 커밋까지만 하고 push는
   사용자에게 안내한다.
4. 새 콘텐츠는 `src/content/` 에만 작성하면 된다. `src/content-en/` 은 자동 생성/갱신되는 산출물이므로
   원칙적으로 직접 작성하지 않는다(번역 톤을 고치고 싶으면 예외적으로 직접 수정 가능하되, 이후 원문을
   건드리지 않는 한 유지됨).
