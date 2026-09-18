export interface CareerItem {
  org: string;
  team?: string;
  period: string;
  role?: string;
}

export const careerTimeline: CareerItem[] = [
  {
    org: '카테노이드',
    team: '찰나팀',
    period: '2025.03 ~ 현재',
    role: 'Frontend Engineer',
  },
  {
    org: '스윗코리아',
    team: '프론트엔드개발팀',
    period: '2020.11 ~ 2024.06',
  },
  {
    org: '세탁특공대',
    period: '2019.12 ~ 2020.04',
  },
  {
    org: '아이디어컴즈',
    period: '2018.08 ~ 2019.06',
  },
  {
    org: '백석대학교 유아교육과',
    period: '2012.03 ~ 2017.02',
    role: '졸업',
  },
];

export const totalCareer = '총 경력 6년 6개월';
