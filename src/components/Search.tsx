'use client';

import { useEffect, useRef, useState } from 'react';
import { t, type Locale } from '@/lib/i18n/dictionary';

interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string };
  }>;
}

interface PagefindSearchOptions {
  filters?: Record<string, string[]>;
}

interface PagefindModule {
  search: (
    query: string,
    options?: PagefindSearchOptions
  ) => Promise<{ results: PagefindResult[] }>;
}

export default function Search({ locale = 'ko' }: { locale?: Locale }) {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<
    { url: string; title: string; excerpt: string }[]
  >([]);
  const [unavailable, setUnavailable] = useState(false);
  const pagefindRef = useRef<PagefindModule | null>(null);
  const dict = t(locale);

  useEffect(() => {
    let cancelled = false;
    const pagefindPath = '/_pagefind/pagefind.js';

    async function load() {
      try {
        const mod = (await import(
          /* webpackIgnore: true */ pagefindPath
        )) as PagefindModule;
        if (!cancelled) pagefindRef.current = mod;
      } catch {
        if (!cancelled) setUnavailable(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!query || !pagefindRef.current) {
        setItems([]);
        return;
      }
      const { results } = await pagefindRef.current.search(query, {
        filters: { lang: [locale] },
      });
      const top = await Promise.all(
        results.slice(0, 8).map(async (r) => {
          const data = await r.data();
          return {
            url: data.url,
            title: data.meta?.title ?? data.url,
            excerpt: data.excerpt,
          };
        })
      );
      if (!cancelled) setItems(top);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [query, locale]);

  if (unavailable) return null;

  return (
    <div className="search-box">
      <input
        type="search"
        className="search-input"
        placeholder={dict.writingPage.searchPlaceholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {items.length > 0 ? (
        <ul className="numbered-list" style={{ marginTop: 16 }}>
          {items.map((item) => (
            <li key={item.url} className="numbered-item">
              <a href={item.url} className="numbered-body" style={{ display: 'block' }}>
                <p className="numbered-title">{item.title}</p>
                <p
                  className="numbered-desc"
                  dangerouslySetInnerHTML={{ __html: item.excerpt }}
                />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
