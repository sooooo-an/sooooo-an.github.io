import type { TocItem } from '@/lib/content';

export default function Toc({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;
  return (
    <nav className="toc" aria-label="목차">
      <p className="toc-title">목차</p>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id} className={`toc-depth-${item.depth}`}>
            <a href={`#${item.id}`}>{item.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
