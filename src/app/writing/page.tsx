import type { Metadata } from 'next';
import WritingPage from '@/components/pages/WritingPage';
import { alternatesFor } from '@/lib/site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Writing',
  description: '기술, 서평, 개인생각을 기록합니다.',
  alternates: alternatesFor('/writing/', '/en/writing/', 'ko'),
  openGraph: { locale: 'ko_KR', alternateLocale: 'en_US' },
};

export default function Page() {
  return <WritingPage locale="ko" />;
}
