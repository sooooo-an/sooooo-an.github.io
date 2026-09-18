import type { Metadata } from 'next';
import ProjectsPage from '@/components/pages/ProjectsPage';
import { alternatesFor } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects',
  description: '안수경이 진행한 프로젝트와 케이스 스터디 목록입니다.',
  alternates: alternatesFor('/projects/', '/en/projects/', 'ko'),
  openGraph: { locale: 'ko_KR', alternateLocale: 'en_US' },
};

export default function Page() {
  return <ProjectsPage locale="ko" />;
}
