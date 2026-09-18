import type { Metadata } from 'next';
import ResumePage from '@/components/pages/ResumePage';
import { siteConfig, alternatesFor } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${siteConfig.name}의 경력 타임라인입니다.`,
  alternates: alternatesFor('/resume/', '/en/resume/', 'ko'),
  openGraph: { locale: 'ko_KR', alternateLocale: 'en_US' },
};

export default function Page() {
  return <ResumePage locale="ko" />;
}
