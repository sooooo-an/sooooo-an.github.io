import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { careerTimeline, totalCareer } from '@/lib/career';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';

export default function AboutPage({ locale = 'ko' }: { locale?: Locale }) {
  const dict = t(locale);

  return (
    <div className="content-narrow" data-pagefind-filter={`lang:${locale}`}>
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          {dict.aboutPage.title}
        </h1>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          {dict.aboutPage.problemTitle}
        </h2>
        <p className="prose" style={{ fontSize: 16 }}>
          {dict.aboutPage.problemBody}
        </p>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          {dict.aboutPage.productTitle}
        </h2>
        <p className="prose" style={{ fontSize: 16 }}>
          {dict.aboutPage.productBody}
        </p>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          {dict.aboutPage.careerTitle}
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
          {dict.aboutPage.resumeTitle}
        </h2>
        <div className="hero-actions">
          <Link href={localePath(locale, '/resume/')} className="btn btn-outline">
            {dict.aboutPage.resumeLink}
          </Link>
          <a href="/resume.pdf" className="btn btn-outline" download>
            {dict.aboutPage.resumePdf}
          </a>
        </div>
      </section>

      <section className="section">
        <h2 className="section-label" style={{ marginBottom: 16 }}>
          {dict.aboutPage.contactTitle}
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
