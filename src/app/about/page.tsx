import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';
import { siteConfig, alternatesFor } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About',
  description: `${siteConfig.name}에 대한 소개입니다.`,
  alternates: alternatesFor('/about/', '/en/about/', 'ko'),
  openGraph: { locale: 'ko_KR', alternateLocale: 'en_US' },
};

export default function Page() {
  return <AboutPage locale="ko" />;
}
