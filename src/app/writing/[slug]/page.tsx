import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
} from '@/lib/content';
import { categoryLabel } from '@/lib/categories';
import { renderMdx } from '@/lib/mdx';
import Toc from '@/components/Toc';
import Giscus from '@/components/Giscus';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { prev, next } = getAdjacentPosts(slug);
  const content = await renderMdx(post.content);

  return (
    <div className="content-narrow">
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>{post.date}</span>
          <span>{categoryLabel(post.category)}</span>
          <span>{post.readingTime}분 읽기</span>
        </div>
      </header>

      <Toc items={post.toc} />

      <article className="prose" data-pagefind-body>
        {content}
      </article>

      <nav className="adjacent-posts">
        {prev ? (
          <Link href={`/writing/${prev.slug}/`} className="adjacent-link prev">
            <p className="adjacent-label">이전 글</p>
            <p className="adjacent-title">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/writing/${next.slug}/`} className="adjacent-link next">
            <p className="adjacent-label">다음 글</p>
            <p className="adjacent-title">{next.title}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <Giscus />
    </div>
  );
}
