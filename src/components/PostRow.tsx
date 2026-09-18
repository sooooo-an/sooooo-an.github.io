import Link from 'next/link';
import type { PostMeta } from '@/lib/content';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';

export default function PostRow({
  post,
  index,
  locale = 'ko',
}: {
  post: PostMeta;
  index: number;
  locale?: Locale;
}) {
  const dict = t(locale);
  return (
    <li className="numbered-item">
      <span className="numbered-index">{String(index).padStart(2, '0')}</span>
      <Link
        href={localePath(locale, `/writing/${post.slug}/`)}
        className="numbered-body"
        style={{ display: 'block' }}
      >
        <p className="numbered-title">{post.title}</p>
        <p className="numbered-meta">
          {post.date} · {dict.categories[post.category]}
        </p>
        <p className="numbered-desc">{post.description}</p>
      </Link>
    </li>
  );
}
