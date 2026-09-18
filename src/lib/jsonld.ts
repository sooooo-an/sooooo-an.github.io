import { siteConfig } from './site';
import type { Locale } from './i18n/dictionary';

export function personSchema(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: locale === 'en' ? `${siteConfig.url}/en/` : `${siteConfig.url}/`,
    sameAs: [siteConfig.github],
    description,
  };
}

export function blogPostingSchema(params: {
  headline: string;
  description: string;
  datePublished?: string;
  url: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.headline,
    description: params.description,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: params.url,
  };
  if (params.datePublished) {
    schema.datePublished = params.datePublished;
  }
  return schema;
}

export function creativeWorkSchema(params: {
  headline: string;
  description: string;
  url: string;
  datePublished?: string;
}) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    headline: params.headline,
    description: params.description,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: params.url,
  };
  if (params.datePublished) {
    schema.datePublished = params.datePublished;
  }
  return schema;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
