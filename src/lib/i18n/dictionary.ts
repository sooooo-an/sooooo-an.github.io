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
  projectDetail: {
      period: string;
      role: string;
      stack: string;
      proves: string;
      troubleshooting: string;
    };
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
        'All-in-One 개발을 지향합니다.\n한 사람의 역량에 AI를 더해, 만든 제품이 실제로 돈을 버는 데까지 가는 일에 관심이 있습니다.',
      heroButtons: { projects: '프로젝트 보기', writing: '글 보기', github: 'GitHub' },
      featuredProjects: '대표 프로젝트',
      featuredPosts: '대표 글',
      interestsTitle: '현재 관심 분야',
      interestsDesc:
        'AI를 도구로 써서 한 사람이 감당할 수 있는 범위를 넓히는 데 관심이 있습니다. 만들고 끝내는 게 아니라, 지표를 보고 수익으로 이어지는 구조까지 만들어보고 있습니다.',
      interests: [
        'All-in-One 제품 개발',
        'AI를 활용한 제품 운영 자동화',
        '제품 지표와 그로스',
        '수익화와 사업화',
        '임베드 위젯 아키텍처',
      ],
      contact: '연락처',
      siteDescription:
        '한 사람의 역량에 AI를 더해, 기획부터 개발과 수익화까지 직접 굴려보는 프론트엔드 개발자입니다.',
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
        '프론트엔드를 주로 해왔습니다. 다만 역할을 나누기보다 문제를 끝까지 따라가는 편이라, 필요하면 백엔드나 기획, 지표 쪽도 같이 들여다보게 됩니다. 요즘은 만든 기능이 왜 안 쓰이는지를 데이터로 확인하고 다음 행동을 정하는 데 시간을 더 쓰고 있습니다.',
      productTitle: '어떤 제품을 만들고 싶은지',
      productBody:
        '기획부터 개발, 배포, 지표 확인까지 혼자서도 굴릴 수 있는 제품을 만들고 싶습니다. AI를 도구로 써서 한 사람이 감당할 수 있는 범위를 넓히고, 그 결과가 실제로 돈을 버는 데까지 이어지는 것이 목표입니다.',
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
    projectDetail: {
      period: '기간',
      role: '역할',
      stack: '스택',
      proves: '증명 역량',
      troubleshooting: '트러블슈팅',
    },
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
        "I aim to build end to end, on my own.\nI'm interested in combining one person's skills with AI to take a product all the way to revenue.",
      heroButtons: { projects: 'View Projects', writing: 'View Writing', github: 'GitHub' },
      featuredProjects: 'Featured Projects',
      featuredPosts: 'Featured Writing',
      interestsTitle: 'Current Interests',
      interestsDesc:
        "I'm interested in using AI to widen the range one person can cover — not just shipping something, but building the loop from metrics through to revenue.",
      interests: [
        'End-to-end product development',
        'AI-assisted product operations automation',
        'Product metrics & growth',
        'Monetization & building a business',
        'Embedded widget architecture',
      ],
      contact: 'Contact',
      siteDescription:
        "A frontend developer combining one person's skills with AI — from planning and building through to revenue.",
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
        "Frontend is where I've spent most of my time. I tend to follow a problem through rather than stop at a role boundary, so I end up looking into the backend, the product spec, or the metrics when that's what it takes. Lately I've been spending more time figuring out — from the data — why a feature isn't being used, and deciding what to do next.",
      productTitle: 'What I want to build',
      productBody:
        'I want to build products I can run on my own, from planning through shipping to reading the metrics. The goal is to use AI to widen the range one person can cover, and to take that all the way to actually making money.',
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
    projectDetail: {
      period: 'Period',
      role: 'Role',
      stack: 'Stack',
      proves: 'Skills Proven',
      troubleshooting: 'Troubleshooting',
    },
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
