import { execSync } from 'node:child_process';
import path from 'node:path';

export const BADGE_WINDOW_DAYS = 7;

export interface GitDates {
  createdAt: Date | null;
  updatedAt: Date | null;
}

export function getGitDates(filePath: string): GitDates {
  try {
    const relPath = path.relative(process.cwd(), filePath);
    const output = execSync(`git log --follow --format=%aI -- "${relPath}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();

    if (!output) {
      return { createdAt: null, updatedAt: null };
    }

    const lines = output.split('\n').filter(Boolean);
    if (lines.length === 0) {
      return { createdAt: null, updatedAt: null };
    }

    const updatedAt = new Date(lines[0]);
    const createdAt = new Date(lines[lines.length - 1]);

    return {
      createdAt: Number.isNaN(createdAt.getTime()) ? null : createdAt,
      updatedAt: Number.isNaN(updatedAt.getTime()) ? null : updatedAt,
    };
  } catch {
    return { createdAt: null, updatedAt: null };
  }
}

export function isWithinDays(date: Date | null, days: number): boolean {
  if (!date) return false;
  const now = Date.now();
  const diffMs = now - date.getTime();
  return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
}

export type ContentBadge = 'new' | 'updated' | null;

export function getContentBadge(filePath: string): ContentBadge {
  const { createdAt, updatedAt } = getGitDates(filePath);

  if (!createdAt || !updatedAt) {
    return 'new';
  }

  if (isWithinDays(createdAt, BADGE_WINDOW_DAYS)) {
    return 'new';
  }

  if (isWithinDays(updatedAt, BADGE_WINDOW_DAYS)) {
    return 'updated';
  }

  return null;
}
