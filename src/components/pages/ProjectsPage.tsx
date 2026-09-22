import { getListedProjects } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';
import { breadcrumbSchema } from '@/lib/jsonld';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsPage({ locale = 'ko' }: { locale?: Locale }) {
  const dict = t(locale);
  const projects = getListedProjects(locale);

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
      </section>
      <section className="section" style={{ marginTop: 0 }}>
        <ul className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </ul>
      </section>
    </div>
  );
}
