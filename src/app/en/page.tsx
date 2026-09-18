import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';
import { alternatesFor } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const dict = t('en');
  return {
    title: `${dict.nav.home}`,
    description: dict.home.siteDescription,
    alternates: alternatesFor('/', '/en/', 'en'),
    openGraph: {
      title: 'Sookyung Ahn',
      description: dict.home.siteDescription,
      locale: 'en_US',
      alternateLocale: 'ko_KR',
    },
  };
}

export default function Page() {
  return <HomePage locale="en" />;
}
