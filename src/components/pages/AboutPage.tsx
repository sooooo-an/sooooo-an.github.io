import { siteConfig } from '@/lib/site';
import { careerTimeline, formatPeriod, getTotalCareer } from '@/lib/career';
import { t, type Locale } from '@/lib/i18n/dictionary';

export default function AboutPage({ locale = 'ko' }: { locale?: Locale }) {
  const dict = t(locale);

  return (
    <div className="content-narrow" data-pagefind-filter={`lang:${locale}`}>
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          {dict.aboutPage.title}
        </h1>
        {siteConfig.avatar ? (
          <div className="about-profile">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="about-avatar"
              src={siteConfig.avatar}
              alt={siteConfig.name}
              width={120}
              height={120}
            />
            <div className="about-profile-meta">
              <p className="about-profile-name">{siteConfig.name}</p>
              <p className="about-profile-role">{siteConfig.role}</p>
            </div>
          </div>
        ) : null}
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
          {getTotalCareer(locale)}
        </p>
        <ul className="timeline">
          {careerTimeline.map((item) => {
            const org = locale === 'ko' ? item.org : item.orgEn;
            const team = locale === 'ko' ? item.team : item.teamEn;
            const role = locale === 'ko' ? item.role : item.roleEn;
            return (
              <li key={`${item.org}-${item.start}`} className="timeline-item">
                <p className="timeline-period">{formatPeriod(item, locale)}</p>
                <p className="timeline-org">
                  {org}
                  {team ? ` · ${team}` : ''}
                </p>
                {role ? <p className="timeline-role">{role}</p> : null}
              </li>
            );
          })}
        </ul>
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
