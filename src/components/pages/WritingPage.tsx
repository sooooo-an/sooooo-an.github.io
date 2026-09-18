import { getAllPosts } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';
import { breadcrumbSchema } from '@/lib/jsonld';
import WritingList from '@/components/WritingList';
import Search from '@/components/Search';

export default function WritingPage({ locale = 'ko' }: { locale?: Locale }) {
  const dict = t(locale);
  const posts = getAllPosts(locale).map(({ content, toc, ...meta }) => meta);

  const schema = breadcrumbSchema([
    { name: dict.nav.home, url: `${siteConfig.url}${localePath(locale, '/')}` },
    { name: dict.nav.writing, url: `${siteConfig.url}${localePath(locale, '/writing/')}` },
  ]);

  return (
    <div className="content-wide" data-pagefind-filter={`lang:${locale}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="hero" style={{ paddingBottom: 32 }}>
        <h1 className="hero-name" style={{ fontSize: 32 }}>
          {dict.writingPage.title}
        </h1>
        <p style={{ color: 'var(--color-meta)', marginTop: 12 }}>
          {dict.writingPage.desc}
        </p>
      </section>
      <section className="section" style={{ marginTop: 0 }}>
        <Search locale={locale} />
        <WritingList posts={posts} locale={locale} />
      </section>
    </div>
  );
}
