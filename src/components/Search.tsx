'use client';

import { useEffect, useRef, useState } from 'react';

interface PagefindResult {
  id: string;
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: { title?: string };
  }>;
}

interface PagefindModule {
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [items, setItems] = useState<
    { url: string; title: string; excerpt: string }[]
  >([]);
  const [unavailable, setUnavailable] = useState(false);
  const pagefindRef = useRef<PagefindModule | null>(null);

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
      const { results } = await pagefindRef.current.search(query);
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
  }, [query]);

  if (unavailable) return null;

  return (
    <div className="search-box">
      <input
        type="search"
        className="search-input"
        placeholder="글 검색..."
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
