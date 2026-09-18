import type { Metadata } from 'next';
import { getAllProjects } from '@/lib/content';
import ProjectRow from '@/components/ProjectRow';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Projects',
  description: '안수경이 진행한 프로젝트와 케이스 스터디 목록입니다.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  return (
    <div className="content-wide">
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          Projects
        </h1>
        <p style={{ color: 'var(--color-meta)', marginTop: 12 }}>
          카드 소개로 끝내지 않고, 각 프로젝트가 증명하는 역량과 과정을 케이스
          스터디로 정리했습니다.
        </p>
      </section>
      <section className="section" style={{ marginTop: 0 }}>
        <ul className="numbered-list">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </section>
    </div>
  );
}
