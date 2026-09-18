import Link from 'next/link';
import type { ProjectMeta } from '@/lib/content';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';
import ContentBadge from '@/components/ContentBadge';

export default function ProjectRow({
  project,
  locale = 'ko',
}: {
  project: ProjectMeta;
  locale?: Locale;
}) {
  const dict = t(locale);
  return (
    <li className="numbered-item">
      <Link
        href={localePath(locale, `/projects/${project.slug}/`)}
        className="numbered-body"
        style={{ display: 'block' }}
      >
        <p className="numbered-title">
          {project.title}
          <ContentBadge badge={project.badge} locale={locale} />
        </p>
        <p className="numbered-desc">{project.summary}</p>
        {project.proves.length > 0 ? (
          <p className="numbered-tags">
            {dict.provesLabel}: {project.proves.join(' · ')}
          </p>
        ) : null}
      </Link>
    </li>
  );
}
