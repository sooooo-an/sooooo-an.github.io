import type { Metadata } from 'next';
import ProjectsPage from '@/components/pages/ProjectsPage';
import { alternatesFor } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';

export const dynamic = 'force-static';

export function generateMetadata(): Metadata {
  const dict = t('en');
  return {
    title: dict.projectsPage.title,
    description: dict.projectsPage.desc,
    alternates: alternatesFor('/projects/', '/en/projects/', 'en'),
    openGraph: { locale: 'en_US', alternateLocale: 'ko_KR' },
  };
}

export default function Page() {
  return <ProjectsPage locale="en" />;
}
