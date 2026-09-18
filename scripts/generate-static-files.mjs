import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const SITE_URL = 'https://sooooo-an.github.io';
const SITE_NAME = '안수경';
const SITE_DESC = '복잡한 제품의 실패 조건을 정의하고 안정적으로 운영되는 프론트엔드 시스템을 만듭니다.';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'src', 'content');
const PUBLIC_DIR = path.join(ROOT, 'public');

const categoryDirs = ['tech', 'review', 'thoughts'];

function readPosts() {
  const posts = [];
  for (const dir of categoryDirs) {
    const full = path.join(CONTENT_DIR, dir);
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

function readProjects() {
  const dir = path.join(CONTENT_DIR, 'projects');
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

function generateSitemap(posts, projects) {
  const staticRoutes = ['', 'projects/', 'writing/', 'about/', 'resume/'];
  const urls = [
    ...staticRoutes.map((r) => `${SITE_URL}/${r}`),
    ...projects.map((p) => `${SITE_URL}/projects/${p.slug}/`),
    ...posts.map((p) => `${SITE_URL}/writing/${p.slug}/`),
  ];
  const body = urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`)
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemap, 'utf8');
}

function generateRobots() {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots, 'utf8');
}

function main() {
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  const posts = readPosts();
  const projects = readProjects();
  generateRss(posts);
  generateSitemap(posts, projects);
  generateRobots();
  console.log(`[prebuild] rss.xml, sitemap.xml, robots.txt generated (${posts.length} posts, ${projects.length} projects)`);
}

main();
