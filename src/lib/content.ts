import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { createSlugger } from './slugify';
import { categories, type CategorySlug } from './categories';

const CONTENT_DIR = path.join(process.cwd(), 'src', 'content');
const PROJECTS_DIR = path.join(CONTENT_DIR, 'projects');

export interface TocItem {
  depth: number;
  text: string;
  id: string;
}

export interface PostMeta {
  slug: string;
  category: CategorySlug;
  title: string;
  date: string;
  description: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
  readingTime: number;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocItem[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  proves: string[];
  featured: boolean;
  order: number;
}

export interface Project extends ProjectMeta {
  content: string;
}

function extractToc(raw: string): TocItem[] {
  const slugger = createSlugger();
  const lines = raw.split('\n');
  const toc: TocItem[] = [];
  const headingRegex = /^(#{1,3})\s+(.+)$/;
  let inCodeBlock = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;
    const match = line.match(headingRegex);
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].trim();
    const id = slugger.slug(text);
    toc.push({ depth, text, id });
  }
  return toc;
}

function estimateReadingTime(raw: string): number {
  const plain = raw
    .replace(/```[\s\S]*?```/g, '')
    .replace(/[#>*_`\-\[\]()]/g, '')
    .trim();
  const charCount = plain.replace(/\s+/g, '').length;
  return Math.max(1, Math.round(charCount / 500));
}

function isProd() {
  return process.env.NODE_ENV === 'production';
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  for (const category of categories) {
    const dir = path.join(CONTENT_DIR, category.slug);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(raw);
      const draft = Boolean(data.draft);
      if (draft && isProd()) continue;
      posts.push({
        slug,
        category: category.slug,
        title: data.title,
        date: data.date,
        description: data.description ?? '',
        tags: data.tags ?? [],
        featured: Boolean(data.featured),
        draft,
        readingTime: estimateReadingTime(content),
        content,
        toc: extractToc(content),
      });
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;
  return { prev, next };
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  const files = fs.readdirSync(PROJECTS_DIR).filter((f) => f.endsWith('.mdx'));
  const projects: Project[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(PROJECTS_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title,
      summary: data.summary ?? '',
      role: data.role ?? '',
      period: data.period ?? '',
      stack: data.stack ?? [],
      proves: data.proves ?? [],
      featured: Boolean(data.featured),
      order: typeof data.order === 'number' ? data.order : 999,
      content,
    };
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}
