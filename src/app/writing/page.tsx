import type { Metadata } from 'next';
import { getAllPosts } from '@/lib/content';
import WritingList from '@/components/WritingList';
import Search from '@/components/Search';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Writing',
  description: '기술, 서평, 개인생각을 기록합니다.',
};

export default function WritingPage() {
  const posts = getAllPosts().map(({ content, toc, ...meta }) => meta);
  return (
    <div className="content-wide">
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          Writing
        </h1>
        <p style={{ color: 'var(--color-meta)', marginTop: 12 }}>
          기술, 서평, 개인생각 세 갈래로 기록합니다.
        </p>
      </section>
      <section className="section" style={{ marginTop: 0 }}>
        <Search />
        <WritingList posts={posts} />
      </section>
    </div>
  );
}
