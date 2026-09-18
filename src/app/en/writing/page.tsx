import type { Metadata } from 'next';
import WritingPage from '@/components/pages/WritingPage';
import { alternatesFor } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const dict = t('en');
  return {
    title: dict.writingPage.title,
    description: dict.writingPage.desc,
    alternates: alternatesFor('/writing/', '/en/writing/', 'en'),
    openGraph: { locale: 'en_US', alternateLocale: 'ko_KR' },
  };
}

export default function Page() {
  return <WritingPage locale="en" />;
}
