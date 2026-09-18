import type { TocItem } from '@/lib/content';
import { t, type Locale } from '@/lib/i18n/dictionary';

export default function Toc({
  items,
  locale = 'ko',
}: {
  items: TocItem[];
  locale?: Locale;
}) {
  const dict = t(locale);
  if (items.length === 0) return null;
  return (
    <nav className="toc" aria-label={dict.postDetail.toc}>
      <p className="toc-title">{dict.postDetail.toc}</p>
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
