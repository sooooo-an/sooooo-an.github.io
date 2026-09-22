import Link from 'next/link';
import { getAllPosts, getListedProjects } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';
import { personSchema } from '@/lib/jsonld';
import SectionHeader from '@/components/SectionHeader';
import ProjectRow from '@/components/ProjectRow';
import PostRow from '@/components/PostRow';

export default function HomePage({ locale = 'ko' }: { locale?: Locale }) {
  const dict = t(locale);
  const featuredProjects = getListedProjects(locale)
    .filter((p) => p.featured)
    .slice(0, 3);
  const featuredPosts = getAllPosts(locale)
    .filter((p) => p.featured)
    .slice(0, 4);

  const schema = personSchema(locale, dict.home.siteDescription);

  return (
    <div className="content-wide" data-pagefind-filter={`lang:${locale}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="hero">
        <h1 className="hero-name">{siteConfig.name}</h1>
        <p className="hero-role">{siteConfig.role}</p>
        <p className="hero-desc">{dict.home.heroDesc}</p>
        <div className="hero-actions">
          <Link href={localePath(locale, '/projects/')} className="btn btn-primary">
            {dict.home.heroButtons.projects}
          </Link>
          <Link href={localePath(locale, '/writing/')} className="btn btn-outline">
            {dict.home.heroButtons.writing}
          </Link>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            {dict.home.heroButtons.github}
          </a>
        </div>
      </section>

      <section className="section">
        <SectionHeader
          label={dict.home.featuredProjects}
          moreHref={localePath(locale, '/projects/')}
          locale={locale}
        />
        <ul className="numbered-list">
          {featuredProjects.map((project) => (
            <ProjectRow key={project.slug} project={project} locale={locale} />
          ))}
        </ul>
      </section>

      <section className="section">
        <SectionHeader
          label={dict.home.featuredPosts}
          moreHref={localePath(locale, '/writing/')}
          locale={locale}
        />
        <ul className="numbered-list">
          {featuredPosts.map((post, i) => (
            <PostRow key={post.slug} post={post} index={i + 1} locale={locale} />
          ))}
        </ul>
      </section>

      <section className="section">
        <SectionHeader label={dict.home.interestsTitle} locale={locale} />
        <p className="prose" style={{ fontSize: 15 }}>
          {dict.home.interestsDesc}
        </p>
        <div className="pill-list">
          {dict.home.interests.map((interest) => (
            <span key={interest} className="pill">
              {interest}
            </span>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeader label={dict.home.contact} locale={locale} />
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
