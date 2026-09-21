import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { renderMdx } from '@/lib/mdx';
import { alternatesFor, siteConfig } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';
import { creativeWorkSchema } from '@/lib/jsonld';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllProjects('en').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, 'en');
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: alternatesFor(
      `/projects/${slug}/`,
      `/en/projects/${slug}/`,
      'en'
    ),
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      locale: 'en_US',
      alternateLocale: 'ko_KR',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, 'en');
  if (!project) notFound();

  const dict = t('en');
  const content = await renderMdx(project.content);
  const schema = creativeWorkSchema({
    headline: project.title,
    description: project.summary,
    url: `${siteConfig.url}/en/projects/${slug}/`,
  });

  return (
    <div className="content-narrow" data-pagefind-filter="lang:en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <header className="post-header">
        <h1 className="post-title">
          {project.title}
        </h1>
        <p style={{ color: 'var(--color-meta)', marginBottom: 16 }}>
          {project.summary}
        </p>
        <dl className="meta-block">
          <dt>{dict.projectDetail.period}</dt>
          <dd>{project.period}</dd>
          <dt>{dict.projectDetail.role}</dt>
          <dd>{project.role}</dd>
          <dt>{dict.projectDetail.stack}</dt>
          <dd className="tag-inline">{project.stack.join(' · ')}</dd>
          <dt>{dict.projectDetail.proves}</dt>
          <dd className="tag-inline">{project.proves.join(' · ')}</dd>
        </dl>
      </header>
      <article className="prose" data-pagefind-body>
        {content}
      </article>
    </div>
  );
}
