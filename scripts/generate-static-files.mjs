import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://sooooo-an.github.io';
const SITE_NAME = '안수경';
const SITE_DESC = '복잡한 제품의 실패 조건을 정의하고 안정적으로 운영되는 프론트엔드 시스템을 만듭니다.';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content');
const CONTENT_EN_DIR = path.join(ROOT, 'src', 'content-en');
const PUBLIC_DIR = path.join(ROOT, 'public');

const categoryDirs = ['tech', 'review', 'thoughts'];

function readPosts(contentDir) {
  const posts = [];
  for (const dir of categoryDirs) {
    const full = path.join(contentDir, dir);
    if (!fs.existsSync(full)) continue;
    for (const file of fs.readdirSync(full).filter((f) => f.endsWith('.mdx'))) {
      const raw = fs.readFileSync(path.join(full, file), 'utf8');
      const { data } = matter(raw);
      if (data.draft) continue;
      posts.push({
        slug: file.replace(/\.mdx$/, ''),
        category: dir,
        title: data.title,
        date: data.date,
        description: data.description ?? '',
      });
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

function readProjects(contentDir) {
  const dir = path.join(contentDir, 'projects');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data } = matter(raw);
    return { slug: file.replace(/\.mdx$/, ''), title: data.title };
  });
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function generateRss(posts) {
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/writing/${post.slug}/</link>
      <guid>${SITE_URL}/writing/${post.slug}/</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>ko</language>${items}
  </channel>
</rss>
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'rss.xml'), rss, 'utf8');
}

/**
 * ko/en 라우트를 모두 sitemap에 담고, 각 <url> 에 hreflang alternate 링크를 추가한다.
 * ko 경로는 기존 그대로(prefix 없음), en 경로는 /en prefix.
 * pairs 는 { koPath, enPath, hasEn } 형태로, 정적 라우트와 상세 라우트(slug 매칭 필요)를
 * 명확히 구분해서 만든다 — 'projects/' 같은 목록 경로가 상세 페이지 slug 매칭 로직과
 * 충돌하지 않도록 각 항목에 hasEn 을 미리 계산해서 넣는다.
 */
function generateSitemap(koPosts, koProjects, enPosts, enProjects) {
  const staticRoutes = ['', 'projects/', 'writing/', 'about/', 'resume/'];
  const enProjectSlugs = new Set(enProjects.map((p) => p.slug));
  const enPostSlugs = new Set(enPosts.map((p) => p.slug));

  const pairs = [
    ...staticRoutes.map((r) => ({ koPath: r, enPath: r, hasEn: true })),
    ...koProjects.map((p) => ({
      koPath: `projects/${p.slug}/`,
      enPath: `projects/${p.slug}/`,
      hasEn: enProjectSlugs.has(p.slug),
    })),
    ...koPosts.map((p) => ({
      koPath: `writing/${p.slug}/`,
      enPath: `writing/${p.slug}/`,
      hasEn: enPostSlugs.has(p.slug),
    })),
  ];

  const koBody = pairs
    .map(({ koPath, enPath, hasEn }) => {
      const koUrl = `${SITE_URL}/${koPath}`;
      const enUrl = `${SITE_URL}/en/${enPath}`;
      const alternates = hasEn
        ? `\n    <xhtml:link rel="alternate" hreflang="ko" href="${koUrl}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${koUrl}" />`
        : '';
      return `  <url>\n    <loc>${koUrl}</loc>${alternates}\n  </url>`;
    })
    .join('\n');

  const enBody = pairs
    .filter((pair) => pair.hasEn)
    .map(({ koPath, enPath }) => {
      const koUrl = `${SITE_URL}/${koPath}`;
      const enUrl = `${SITE_URL}/en/${enPath}`;
      return `  <url>\n    <loc>${enUrl}</loc>\n    <xhtml:link rel="alternate" hreflang="ko" href="${koUrl}" />\n    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${koUrl}" />\n  </url>`;
    })
    .join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${koBody}\n${enBody}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
}

function generateRobots() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots, 'utf8');
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const koPosts = readPosts(CONTENT_DIR);
  const koProjects = readProjects(CONTENT_DIR);
  const enPosts = readPosts(CONTENT_EN_DIR);
  const enProjects = readProjects(CONTENT_EN_DIR);
  generateRss(koPosts);
  generateSitemap(koPosts, koProjects, enPosts, enProjects);
  generateRobots();
  console.log(
    `[prebuild] rss.xml, sitemap.xml, robots.txt generated (ko: ${koPosts.length} posts/${koProjects.length} projects, en: ${enPosts.length} posts/${enProjects.length} projects)`
  );
}

main();
