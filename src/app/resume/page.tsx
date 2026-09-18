import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site';
import { careerTimeline, totalCareer } from '@/lib/career';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Resume',
  description: `${siteConfig.name}의 경력 타임라인입니다.`,
};

export default function ResumePage() {
  return (
    <div className="content-narrow">
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          Resume
        </h1>
        <p style={{ color: 'var(--color-meta)', marginTop: 12 }}>
          {siteConfig.name} · {siteConfig.role} · {totalCareer}
        </p>
      </section>

      <section className="section" style={{ marginTop: 0 }}>
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
        <a href="/resume.pdf" className="btn btn-primary" download>
          이력서 PDF 다운로드
        </a>
      </section>
    </div>
  );
}
