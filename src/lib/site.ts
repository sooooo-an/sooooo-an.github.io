export const siteConfig = {
  name: '안수경',
  role: 'Frontend Engineer',
  url: 'https://sooooo-an.github.io',
  description:
    '복잡한 제품의 실패 조건을 정의하고 안정적으로 운영되는 프론트엔드 시스템을 만듭니다.',
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
