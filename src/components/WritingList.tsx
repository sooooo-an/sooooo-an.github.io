'use client';

import { useState } from 'react';
import PostRow from './PostRow';
import { categories, type CategorySlug } from '@/lib/categories';
import type { PostMeta } from '@/lib/content';

type TabValue = 'all' | CategorySlug;

export default function WritingList({ posts }: { posts: PostMeta[] }) {
  const [tab, setTab] = useState<TabValue>('all');

  const filtered =
    tab === 'all' ? posts : posts.filter((p) => p.category === tab);

  return (
    <div>
      <div className="tab-list" role="tablist">
        <button
          type="button"
          className={tab === 'all' ? 'tab-btn tab-btn-active' : 'tab-btn'}
          onClick={() => setTab('all')}
        >
          전체
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            className={tab === c.slug ? 'tab-btn tab-btn-active' : 'tab-btn'}
            onClick={() => setTab(c.slug)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <ul className="numbered-list">
        {filtered.map((post, i) => (
          <PostRow key={post.slug} post={post} index={i + 1} />
        ))}
      </ul>
    </div>
  );
}
