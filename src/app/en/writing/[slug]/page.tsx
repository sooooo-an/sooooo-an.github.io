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

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllPosts('en').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: alternatesFor(
      `/writing/${slug}/`,
      `/en/writing/${slug}/`,
      'en'
    ),
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      locale: 'en_US',
      alternateLocale: 'ko_KR',
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, 'en');
  if (!post) notFound();

  const dict = t('en');
  const { prev, next } = getAdjacentPosts(slug, 'en');
  const content = await renderMdx(post.content);
  const schema = blogPostingSchema({
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url: `${siteConfig.url}/en/writing/${slug}/`,
  });

  return (
    <div className="content-narrow" data-pagefind-filter="lang:en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <div className="post-meta">
          <span>{post.date}</span>
          <span>{dict.categories[post.category]}</span>
          <span>{dict.postDetail.readingTime(post.readingTime)}</span>
        </div>
      </header>

      <Toc items={post.toc} locale="en" />

      <article className="prose" data-pagefind-body>
        {content}
      </article>

      <nav className="adjacent-posts">
        {prev ? (
          <Link href={`/en/writing/${prev.slug}/`} className="adjacent-link prev">
            <p className="adjacent-label">{dict.postDetail.prev}</p>
            <p className="adjacent-title">{prev.title}</p>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/en/writing/${next.slug}/`} className="adjacent-link next">
            <p className="adjacent-label">{dict.postDetail.next}</p>
            <p className="adjacent-title">{next.title}</p>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <Giscus locale="en" />
    </div>
  );
}
