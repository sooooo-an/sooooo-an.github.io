import { getAllProjects } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';
import { breadcrumbSchema } from '@/lib/jsonld';
import ProjectRow from '@/components/ProjectRow';

export default function ProjectsPage({ locale = 'ko' }: { locale?: Locale }) {
  const dict = t(locale);
  const projects = getAllProjects(locale);

  const schema = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}${localePath(locale, '/')}` },
    { name: dict.nav.projects, url: `${siteConfig.url}${localePath(locale, '/projects/')}` },
  ]);

  return (
    <div className="content-wide" data-pagefind-filter={`lang:${locale}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          {dict.projectsPage.title}
        </h1>
        <p style={{ color: 'var(--color-meta)', marginTop: 12 }}>
          {dict.projectsPage.desc}
        </p>
      </section>
      <section className="section" style={{ marginTop: 0 }}>
        <ul className="numbered-list">
          {projects.map((project) => (
            <ProjectRow key={project.slug} project={project} locale={locale} />
          ))}
        </ul>
      </section>
    </div>
  );
}
