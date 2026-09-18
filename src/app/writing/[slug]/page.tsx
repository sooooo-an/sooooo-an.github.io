import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getAllPosts,
  getPostBySlug,
  getAdjacentPosts,
} from '@/lib/content';
import { alternatesFor, siteConfig } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';
import { blogPostingSchema } from '@/lib/jsonld';
import { renderMdx } from '@/lib/mdx';
import Toc from '@/components/Toc';
import Giscus from '@/components/Giscus';
import ContentBadge from '@/components/ContentBadge';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllPosts('ko').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'ko');
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: alternatesFor(
      `/writing/${slug}/`,
      `/en/writing/${slug}/`,
      'ko'
    ),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      locale: 'ko_KR',
      alternateLocale: 'en_US',
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'ko');
  if (!post) notFound();

  const dict = t('ko');
  const { prev, next } = getAdjacentPosts(slug, 'ko');
  const content = await renderMdx(post.content);
  const schema = blogPostingSchema({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${siteConfig.url}/writing/${slug}/`,
  });

  return (
    <div className="content-narrow" data-pagefind-filter="lang:ko">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="post-header">
        <h1 className="post-title">
          {post.title}
          <ContentBadge badge={post.badge} locale="ko" />
        </h1>
        <div className="post-meta">
          <span>{post.date}</span>
          <span>{dict.categories[post.category]}</span>
          <span>{dict.postDetail.readingTime(post.readingTime)}</span>
        </div>
      </header>

      <Toc items={post.toc} locale="ko" />

      <article className="prose" data-pagefind-body>
        {content}
      </article>

      <nav className="adjacent-posts">
        {prev ? (
          <Link href={`/writing/${prev.slug}/`} className="adjacent-link prev">
            <p className="adjacent-label">{dict.postDetail.prev}</p>
            <p className="adjacent-title">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/writing/${next.slug}/`} className="adjacent-link next">
            <p className="adjacent-label">{dict.postDetail.next}</p>
            <p className="adjacent-title">{next.title}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <Giscus locale="ko" />
    </div>
  );
}
