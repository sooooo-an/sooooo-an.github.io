import Link from 'next/link';
import type { ProjectMeta } from '@/lib/content';
import { localePath, type Locale } from '@/lib/i18n/dictionary';

export default function ProjectCard({
  project,
  locale,
}: {
  project: ProjectMeta;
  locale: Locale;
}) {
  return (
    <li className="project-card">
      <Link
        href={localePath(locale, `/projects/${project.slug}/`)}
        className="project-card-link"
      >
        {project.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="project-card-cover"
            src={project.cover}
            alt=""
            loading="lazy"
          />
        ) : (
          <div className="project-card-cover project-card-cover-empty" aria-hidden="true" />
        )}
        <div className="project-card-body">
          <p className="project-card-title">{project.title}</p>
          <p className="project-card-desc">{project.summary}</p>
          {project.proves.length > 0 ? (
            <p className="project-card-tags">{project.proves.join(' · ')}</p>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
