import type { Locale } from '@/lib/i18n/dictionary';

export interface CareerItem {
  org: string;
  orgEn: string;
  team?: string;
  teamEn?: string;
  /** 'YYYY-MM' */
  start: string;
  /** 'YYYY-MM' — 생략하면 현재 재직 중 */
  end?: string;
  role?: string;
  roleEn?: string;
  /** 학력 항목은 경력 합산에서 제외한다 */
  education?: boolean;
}

export const careerTimeline: CareerItem[] = [
  {
    org: '카테노이드',
    orgEn: 'Catenoid',
    team: '찰나팀',
    teamEn: 'Charlla Team',
    start: '2025-03',
    role: 'Frontend Engineer',
    roleEn: 'Frontend Engineer',
  },
  {
    org: '스윗코리아',
    orgEn: 'Swit Korea',
    team: '프론트엔드개발팀',
    teamEn: 'Frontend Team',
    start: '2020-11',
    end: '2024-06',
  },
  {
    org: '세탁특공대',
    orgEn: 'Laundrygo',
    start: '2019-12',
    end: '2020-04',
  },
  {
    org: '아이디어컴즈',
    orgEn: 'Ideacomms',
    start: '2018-08',
    end: '2019-06',
  },
  {
    org: '백석대학교 유아교육과',
    orgEn: 'Baekseok University, Early Childhood Education',
    start: '2012-03',
    end: '2017-02',
    role: '졸업',
    roleEn: 'Graduated',
    education: true,
  },
];

function toMonths(ym: string): number {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

/** 'YYYY-MM' → '2025.03' */
function formatYm(ym: string): string {
  return ym.replace('-', '.');
}

export function formatPeriod(item: CareerItem, locale: Locale): string {
  const start = formatYm(item.start);
  if (item.end) return `${start} ~ ${formatYm(item.end)}`;
  return locale === 'ko' ? `${start} ~ 현재` : `${start} ~ Present`;
}

/** 학력을 제외한 재직 기간 합계(개월). 시작월·종료월을 모두 포함해 센다. */
export function getTotalCareerMonths(now = new Date()): number {
  const currentYm = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  return careerTimeline
    .filter((item) => !item.education)
    .reduce((sum, item) => {
      const end = item.end ?? currentYm;
      return sum + (toMonths(end) - toMonths(item.start) + 1);
    }, 0);
}

export function getTotalCareer(locale: Locale, now = new Date()): string {
  const months = getTotalCareerMonths(now);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (locale === 'ko') {
    return rest === 0 ? `총 경력 ${years}년` : `총 경력 ${years}년 ${rest}개월`;
  }
  const y = `${years} yr${years === 1 ? '' : 's'}`;
  const m = `${rest} mo${rest === 1 ? '' : 's'}`;
  return rest === 0 ? `${y} of experience` : `${y} ${m} of experience`;
}
