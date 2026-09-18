import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProjects, getProjectBySlug } from '@/lib/content';
import { renderMdx } from '@/lib/mdx';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const content = await renderMdx(project.content);

  return (
    <div className="content-narrow">
      <header className="post-header">
        <h1 className="post-title">{project.title}</h1>
        <p style={{ color: 'var(--color-meta)', marginBottom: 16 }}>
          {project.summary}
        </p>
        <dl className="meta-block">
          <dt>기간</dt>
          <dd>{project.period}</dd>
          <dt>역할</dt>
          <dd>{project.role}</dd>
          <dt>스택</dt>
          <dd className="tag-inline">{project.stack.join(' · ')}</dd>
          <dt>증명 역량</dt>
          <dd className="tag-inline">{project.proves.join(' · ')}</dd>
        </dl>
      </header>
      <article className="prose" data-pagefind-body>
        {content}
      </article>
    </div>
  );
}
