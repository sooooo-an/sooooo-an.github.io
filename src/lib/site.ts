export const siteConfig = {
  name: '안수경',
  role: 'Frontend Engineer',
  url: 'https://sooooo-an.github.io',
  description:
    '한 사람의 역량에 AI를 더해, 기획부터 개발과 수익화까지 직접 굴려보는 프론트엔드 개발자입니다.',
  email: 'devsoo0527@gmail.com',
  github: 'https://github.com/sooooo-an',
  giscus: {
    repo: 'sooooo-an/sooooo-an.github.io',
    repoId: 'R_kgDOUfwFzg',
    category: 'Announcements',
    categoryId: 'DIC_kwDOUfwFzs4DF3F4',
  },
  analytics: {
    umamiWebsiteId: '3869e0fd-094d-46e1-bf78-35f9660621b0',
    umamiSrc: 'https://cloud.umami.is/script.js',
  },
} as const;

export type SiteConfig = typeof siteConfig;

/**
 * canonical + hreflang alternates 헬퍼.
 * koPath/enPath 는 선행 슬래시를 포함한 절대 경로 (예: '/', '/projects/').
 */
export function alternatesFor(
  koPath: string,
  enPath: string,
  current: 'ko' | 'en'
) {
  const koUrl = `${siteConfig.url}${koPath}`;
  const enUrl = `${siteConfig.url}${enPath}`;
  return {
    canonical: current === 'ko' ? koUrl : enUrl,
    languages: {
      ko: koUrl,
      en: enUrl,
      'x-default': koUrl,
    },
  };
}
