import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { renderMdx } from '@/lib/mdx';
import { alternatesFor, siteConfig } from '@/lib/site';
import { t } from '@/lib/i18n/dictionary';
import { creativeWorkSchema } from '@/lib/jsonld';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllProjects('ko').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug, 'ko');
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: alternatesFor(
      `/projects/${slug}/`,
      `/en/projects/${slug}/`,
      'ko'
    ),
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      locale: 'ko_KR',
      alternateLocale: 'en_US',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug, 'ko');
  if (!project) notFound();

  const dict = t('ko');
  const content = await renderMdx(project.content);
  const allProjects = getAllProjects('ko');
  const related = project.troubleshooting
    .map((s) => allProjects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const schema = creativeWorkSchema({
    headline: project.title,
    description: project.summary,
    url: `${siteConfig.url}/projects/${slug}/`,
  });

  return (
    <div className="content-narrow" data-pagefind-filter="lang:ko">
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
      {related.length > 0 ? (
        <section className="section">
          <h2 className="section-label" style={{ marginBottom: 16 }}>
            {dict.projectDetail.troubleshooting}
          </h2>
          <ul className="numbered-list">
            {related.map((item) => (
              <li key={item.slug} className="numbered-item">
                <Link
                  href={`/projects/${item.slug}/`}
                  className="numbered-body"
                  style={{ display: 'block' }}
                >
                  <p className="numbered-title">{item.title}</p>
                  <p className="numbered-desc">{item.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
