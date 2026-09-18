'use client';

import GiscusWidget from '@giscus/react';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site';

export default function Giscus() {
  const { repo, repoId, category, categoryId } = siteConfig.giscus;
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'dark' : 'light');

    const observer = new MutationObserver(() => {
      const next = document.documentElement.getAttribute('data-theme');
      setTheme(next === 'dark' ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Giscus 설정 필요: src/lib/site.ts 의 giscus.repoId 등을 채우면 댓글창이 표시됩니다.
  if (!repoId) return null;

  return (
    <GiscusWidget
      repo={repo as `${string}/${string}`}
      repoId={repoId}
      category={category}
      categoryId={categoryId}
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={theme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  );
}
