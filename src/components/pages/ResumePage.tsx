import { siteConfig } from '@/lib/site';
import { careerTimeline, totalCareer } from '@/lib/career';
import { t, type Locale } from '@/lib/i18n/dictionary';

export default function ResumePage({ locale = 'ko' }: { locale?: Locale }) {
  const dict = t(locale);

  return (
    <div className="content-narrow" data-pagefind-filter={`lang:${locale}`}>
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          {dict.resumePage.title}
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
          {dict.resumePage.downloadPdf}
        </a>
      </section>
    </div>
  );
}
