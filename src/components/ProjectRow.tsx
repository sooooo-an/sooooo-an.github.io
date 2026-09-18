import Link from 'next/link';
import type { ProjectMeta } from '@/lib/content';

export default function ProjectRow({ project }: { project: ProjectMeta }) {
  return (
    <li className="numbered-item">
      <Link href={`/projects/${project.slug}/`} className="numbered-body" style={{ display: 'block' }}>
        <p className="numbered-title">{project.title}</p>
        <p className="numbered-desc">{project.summary}</p>
        {project.proves.length > 0 ? (
          <p className="numbered-tags">증명하는 역량: {project.proves.join(' · ')}</p>
        ) : null}
      </Link>
    </li>
  );
}
