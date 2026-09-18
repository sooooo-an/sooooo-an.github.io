export type CategorySlug = 'tech' | 'review' | 'thoughts';

export interface CategoryDef {
  slug: CategorySlug;
  label: string;
}

export const categories: CategoryDef[] = [
  { slug: 'tech', label: '기술' },
  { slug: 'review', label: '서평' },
  { slug: 'thoughts', label: '개인생각' },
];

export function categoryLabel(slug: CategorySlug): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

export function isCategorySlug(value: string): value is CategorySlug {
  return categories.some((c) => c.slug === value);
}
