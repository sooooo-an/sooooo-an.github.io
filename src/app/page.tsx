import Link from 'next/link';
import { getAllPosts, getAllProjects } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import SectionHeader from '@/components/SectionHeader';
import ProjectRow from '@/components/ProjectRow';
import PostRow from '@/components/PostRow';

export const dynamic = 'force-static';

const interests = [
  '프론트엔드 신뢰성과 관측 가능성',
  'AI를 활용한 제품 운영 자동화',
  '디자인 시스템과 협업 워크플로',
  'Product Engineering',
];

export default function HomePage() {
  const featuredProjects = getAllProjects()
    .filter((p) => p.featured)
    .slice(0, 3);
  const featuredPosts = getAllPosts()
    .filter((p) => p.featured)
    .slice(0, 4);

  return (
    <div className="content-wide">
      <section className="hero">
        <h1 className="hero-name">{siteConfig.name}</h1>
        <p className="hero-role">{siteConfig.role}</p>
        <p className="hero-desc">
          {'복잡한 제품의 실패 조건을 정의하고\n안정적으로 운영되는 프론트엔드 시스템을 만듭니다.'}
        </p>
        <div className="hero-actions">
          <Link href="/projects/" className="btn btn-primary">
            프로젝트 보기
          </Link>
          <Link href="/writing/" className="btn btn-outline">
            글 보기
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            GitHub
          </a>
        </div>
      </section>

      <section className="section">
        <SectionHeader label="대표 프로젝트" moreHref="/projects/" />
        <ul className="numbered-list">
          {featuredProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} />
          ))}
        </ul>
      </section>

      <section className="section">
        <SectionHeader label="대표 글" moreHref="/writing/" />
        <ul className="numbered-list">
          {featuredPosts.map((post, i) => (
            <PostRow key={post.slug} post={post} index={i + 1} />
          ))}
        </ul>
      </section>

      <section className="section">
        <SectionHeader label="현재 관심 분야" />
        <p className="prose" style={{ fontSize: 15 }}>
          운영 중인 제품이 실패하는 조건을 먼저 정의하고, 그 위에서 안정적으로
          동작하는 프론트엔드 시스템을 만드는 데 관심이 있습니다.
        </p>
        <div className="pill-list">
          {interests.map((interest) => (
            <span key={interest} className="pill">
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader label="연락처" />
        <div className="contact-list">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={siteConfig.github} target="_blank" rel="noreferrer">
            {siteConfig.github}
          </a>
        </div>
      </section>
    </div>
  );
}
