import type { Metadata } from 'next';
import AboutPage from '@/components/pages/AboutPage';
import { alternatesFor } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const dict = t('en');
  return {
    title: dict.aboutPage.title,
    description: dict.aboutPage.description,
    alternates: alternatesFor('/about/', '/en/about/', 'en'),
    openGraph: { locale: 'en_US', alternateLocale: 'ko_KR' },
  };
}

export default function Page() {
  return <AboutPage locale="en" />;
}
