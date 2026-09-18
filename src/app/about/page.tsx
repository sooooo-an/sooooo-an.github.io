import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { careerTimeline, totalCareer } from '@/lib/career';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'About',
  description: `${siteConfig.name}에 대한 소개입니다.`,
};

export default function AboutPage() {
  return (
    <div className="content-narrow">
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          About
        </h1>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          어떤 문제를 잘 해결하는지
        </h2>
        <p className="prose" style={{ fontSize: 16 }}>
          제품이 커질수록 무엇이 실패인지가 먼저 흐려집니다. 저는 그 실패 조건을
          가장 먼저 구체적인 기준으로 정의하고, 그 기준 위에서 예측 가능하게
          동작하는 프론트엔드 시스템을 설계하는 일을 잘합니다.
        </p>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          어떤 제품을 만들고 싶은지
        </h2>
        <p className="prose" style={{ fontSize: 16 }}>
          복잡한 의사결정을 사용자 대신 단순하게 만들어주는 제품, 그리고
          운영자가 매일 마주쳐도 신뢰할 수 있는 안정적인 시스템을 만들고
          싶습니다.
        </p>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          주요 경력
        </h2>
        <p style={{ color: 'var(--color-meta)', marginBottom: 16, fontSize: 14 }}>
          {totalCareer}
        </p>
        <ul className="timeline">
          {careerTimeline.map((item) => (
            <li key={`${item.org}-${item.period}`} className="timeline-item">
              <p className="timeline-period">{item.period}</p>
              <p className="timeline-org">
                {item.org}
                {item.team ? ` · ${item.team}` : ''}
              </p>
              {item.role ? <p className="timeline-role">{item.role}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          이력서
        </h2>
        <div className="hero-actions">
          <Link href="/resume/" className="btn btn-outline">
            이력서 페이지 보기
          </Link>
          <a href="/resume.pdf" className="btn btn-outline" download>
            PDF 다운로드
          </a>
        </div>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          GitHub · 이메일
        </h2>
        <div className="contact-list">
          <a href={siteConfig.github} target="_blank" rel="noreferrer">
            {siteConfig.github}
          </a>
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
        </div>
      </section>
    </div>
  );
}
