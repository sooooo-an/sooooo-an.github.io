import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { createSlugger } from './slugify';
import { categories, type CategorySlug } from './categories';
import type { Locale } from './i18n/dictionary';
import { getContentBadge, type ContentBadge } from './git-dates';

const SRC_DIR = path.join(process.cwd(), 'src');

function contentDir(locale: Locale): string {
  return path.join(SRC_DIR, locale === 'en' ? 'content-en' : 'content');
}

function projectsDir(locale: Locale): string {
  return path.join(contentDir(locale), 'projects');
}

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
  badge: ContentBadge;
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
  badge: ContentBadge;
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

export function getAllPosts(locale: Locale = 'ko'): Post[] {
  const posts: Post[] = [];
  const baseDir = contentDir(locale);
  for (const category of categories) {
    const dir = path.join(baseDir, category.slug);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(dir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(raw);
      const draft = Boolean(data.draft);
      if (draft && isProd()) continue;
      const koSourcePath = path.join(contentDir('ko'), category.slug, file);
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
        badge: getContentBadge(koSourcePath),
        content,
        toc: extractToc(content),
      });
    }
  }
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string, locale: Locale = 'ko'): Post | undefined {
  return getAllPosts(locale).find((p) => p.slug === slug);
}

export function getAdjacentPosts(
  slug: string,
  locale: Locale = 'ko'
): {
  prev: PostMeta | null;
  next: PostMeta | null;
} {
  const posts = getAllPosts(locale);
  const index = posts.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? posts[index - 1] : null;
  const next = index < posts.length - 1 ? posts[index + 1] : null;
  return { prev, next };
}

export function getAllProjects(locale: Locale = 'ko'): Project[] {
  const dir = projectsDir(locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));
  const projects: Project[] = files.map((file) => {
    const slug = file.replace(/\.mdx$/, '');
    const fullPath = path.join(dir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(raw);
    const koSourcePath = path.join(projectsDir('ko'), file);
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
      badge: getContentBadge(koSourcePath),
      content,
    };
  });
  return projects.sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string, locale: Locale = 'ko'): Project | undefined {
  return getAllProjects(locale).find((p) => p.slug === slug);
}
