import type { Metadata } from 'next';
import ResumePage from '@/components/pages/ResumePage';
import { alternatesFor } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const dict = t('en');
  return {
    title: dict.resumePage.title,
    description: dict.resumePage.description,
    alternates: alternatesFor('/resume/', '/en/resume/', 'en'),
    openGraph: { locale: 'en_US', alternateLocale: 'ko_KR' },
  };
}

export default function Page() {
  return <ResumePage locale="en" />;
}
