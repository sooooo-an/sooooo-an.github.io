export type Locale = 'ko' | 'en';

export const localePath = (locale: Locale, path: string): string =>
  locale === 'en' ? `/en${path}` : path;

interface Dictionary {
  nav: { home: string; projects: string; writing: string; about: string };
  languageToggle: string;
  footer: { rss: string; email: string; github: string };
  themeToggleLabel: string;
  sectionMore: string;
  home: {
    heroDesc: string;
    heroButtons: { projects: string; writing: string; github: string };
    featuredProjects: string;
    featuredPosts: string;
    interestsTitle: string;
    interestsDesc: string;
    interests: string[];
    contact: string;
    siteDescription: string;
  };
  projectsPage: { title: string; desc: string };
  writingPage: { title: string; desc: string; searchPlaceholder: string; allTab: string };
  aboutPage: {
    title: string;
    problemTitle: string;
    problemBody: string;
    productTitle: string;
    productBody: string;
    careerTitle: string;
    resumeTitle: string;
    resumeLink: string;
    resumePdf: string;
    contactTitle: string;
    description: string;
  };
  resumePage: { title: string; description: string; downloadPdf: string };
  projectDetail: { period: string; role: string; stack: string; proves: string };
  postDetail: {
    readingTime: (n: number) => string;
    prev: string;
    next: string;
    toc: string;
    comments: string;
  };
  categories: { tech: string; review: string; thoughts: string };
  provesLabel: string;
  badges: { new: string; updated: string };
  notFound: { title: string; desc: string; back: string };
}

export const dictionary: Record<Locale, Dictionary> = {
  ko: {
    nav: { home: 'Home', projects: 'Projects', writing: 'Writing', about: 'About' },
    languageToggle: 'EN',
    footer: { rss: 'RSS', email: 'Email', github: 'GitHub' },
    themeToggleLabel: '다크모드 전환',
    sectionMore: '전체 보기 →',
    home: {
      heroDesc:
        '복잡한 제품의 실패 조건을 정의하고\n안정적으로 운영되는 프론트엔드 시스템을 만듭니다.',
      heroButtons: { projects: '프로젝트 보기', writing: '글 보기', github: 'GitHub' },
      featuredProjects: '대표 프로젝트',
      featuredPosts: '대표 글',
      interestsTitle: '현재 관심 분야',
      interestsDesc:
        '운영 중인 제품이 실패하는 조건을 먼저 정의하고, 그 위에서 안정적으로 동작하는 프론트엔드 시스템을 만드는 데 관심이 있습니다.',
      interests: [
        '프론트엔드 신뢰성과 관측 가능성',
        'AI를 활용한 제품 운영 자동화',
        '디자인 시스템과 협업 워크플로',
        'Product Engineering',
      ],
      contact: '연락처',
      siteDescription:
        '복잡한 제품의 실패 조건을 정의하고 안정적으로 운영되는 프론트엔드 시스템을 만듭니다.',
    },
    projectsPage: {
      title: 'Projects',
      desc: '안수경이 진행한 프로젝트 목록입니다.',
    },
    writingPage: {
      title: 'Writing',
      desc: '기술, 서평, 개인생각 세 갈래로 기록합니다.',
      searchPlaceholder: '글 검색...',
      allTab: '전체',
    },
    aboutPage: {
      title: 'About',
      problemTitle: '어떤 문제를 잘 해결하는지',
      problemBody:
        '제품이 커질수록 무엇이 실패인지가 먼저 흐려집니다. 저는 그 실패 조건을 가장 먼저 구체적인 기준으로 정의하고, 그 기준 위에서 예측 가능하게 동작하는 프론트엔드 시스템을 설계하는 일을 잘합니다.',
      productTitle: '어떤 제품을 만들고 싶은지',
      productBody:
        '복잡한 의사결정을 사용자 대신 단순하게 만들어주는 제품, 그리고 운영자가 매일 마주쳐도 신뢰할 수 있는 안정적인 시스템을 만들고 싶습니다.',
      careerTitle: '주요 경력',
      resumeTitle: '이력서',
      resumeLink: '이력서 페이지 보기',
      resumePdf: 'PDF 다운로드',
      contactTitle: 'GitHub · 이메일',
      description: '안수경에 대한 소개입니다.',
    },
    resumePage: {
      title: 'Resume',
      description: '안수경의 경력 타임라인입니다.',
      downloadPdf: '이력서 PDF 다운로드',
    },
    projectDetail: { period: '기간', role: '역할', stack: '스택', proves: '증명 역량' },
    postDetail: {
      readingTime: (n: number) => `${n}분 읽기`,
      prev: '이전 글',
      next: '다음 글',
      toc: '목차',
      comments: '댓글',
    },
    categories: { tech: '기술', review: '서평', thoughts: '개인생각' },
    provesLabel: '증명하는 역량',
    badges: { new: 'New', updated: '수정' },
    notFound: {
      title: '페이지를 찾을 수 없습니다',
      desc: '요청하신 페이지가 존재하지 않거나 이동되었습니다.',
      back: '홈으로 돌아가기',
    },
  },
  en: {
    nav: { home: 'Home', projects: 'Projects', writing: 'Writing', about: 'About' },
    languageToggle: 'KO',
    footer: { rss: 'RSS', email: 'Email', github: 'GitHub' },
    themeToggleLabel: 'Toggle dark mode',
    sectionMore: 'View all →',
    home: {
      heroDesc:
        'I define the failure conditions of complex products\nand build frontend systems that run reliably in production.',
      heroButtons: { projects: 'View Projects', writing: 'View Writing', github: 'GitHub' },
      featuredProjects: 'Featured Projects',
      featuredPosts: 'Featured Writing',
      interestsTitle: 'Current Interests',
      interestsDesc:
        "I'm interested in first defining the conditions under which a live product fails, then building frontend systems that behave reliably on top of that foundation.",
      interests: [
        'Frontend reliability & observability',
        'AI-assisted product operations automation',
        'Design systems & collaboration workflows',
        'Product Engineering',
      ],
      contact: 'Contact',
      siteDescription:
        'I define the failure conditions of complex products and build frontend systems that run reliably in production.',
    },
    projectsPage: {
      title: 'Projects',
      desc: 'Projects by Sookyung An.',
    },
    writingPage: {
      title: 'Writing',
      desc: 'I write across three tracks: tech, book reviews, and thoughts.',
      searchPlaceholder: 'Search posts...',
      allTab: 'All',
    },
    aboutPage: {
      title: 'About',
      problemTitle: 'What problems I solve well',
      problemBody:
        "As a product grows, what counts as failure becomes harder to see. I'm good at defining those failure conditions as concrete criteria first, then designing frontend systems that behave predictably on top of that foundation.",
      productTitle: 'What I want to build',
      productBody:
        'I want to build products that make complex decisions simple on behalf of users, and stable systems that operators can trust every single day.',
      careerTitle: 'Career',
      resumeTitle: 'Resume',
      resumeLink: 'View resume page',
      resumePdf: 'Download PDF',
      contactTitle: 'GitHub · Email',
      description: 'An introduction to Sookyung Ahn.',
    },
    resumePage: {
      title: 'Resume',
      description: "Sookyung Ahn's career timeline.",
      downloadPdf: 'Download Resume PDF',
    },
    projectDetail: { period: 'Period', role: 'Role', stack: 'Stack', proves: 'Skills Proven' },
    postDetail: {
      readingTime: (n: number) => `${n} min read`,
      prev: 'Previous',
      next: 'Next',
      toc: 'Table of Contents',
      comments: 'Comments',
    },
    categories: { tech: 'Tech', review: 'Book Review', thoughts: 'Thoughts' },
    provesLabel: 'Skills proven',
    badges: { new: 'New', updated: 'Updated' },
    notFound: {
      title: 'Page not found',
      desc: 'The page you requested does not exist or has been moved.',
      back: 'Back to home',
    },
  },
};

export function t(locale: Locale): Dictionary {
  return dictionary[locale];
}
