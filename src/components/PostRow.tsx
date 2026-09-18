import Link from 'next/link';
import type { PostMeta } from '@/lib/content';
import { categoryLabel } from '@/lib/categories';

export default function PostRow({
  post,
  index,
}: {
  post: PostMeta;
  index: number;
}) {
  return (
    <li className="numbered-item">
      <span className="numbered-index">{String(index).padStart(2, '0')}</span>
      <Link href={`/writing/${post.slug}/`} className="numbered-body" style={{ display: 'block' }}>
        <p className="numbered-title">{post.title}</p>
        <p className="numbered-meta">
          {post.date} · {categoryLabel(post.category)}
        </p>
        <p className="numbered-desc">{post.description}</p>
      </Link>
    </li>
  );
}
