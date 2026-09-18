import type { ContentBadge as ContentBadgeType } from '@/lib/git-dates';
import { t, type Locale } from '@/lib/i18n/dictionary';

export default function ContentBadge({
  badge,
  locale = 'ko',
}: {
  badge: ContentBadgeType;
  locale?: Locale;
}) {
  if (!badge) return null;
  const dict = t(locale);
  const label = badge === 'new' ? dict.badges.new : dict.badges.updated;
  const className = badge === 'new' ? 'badge badge-new' : 'badge badge-updated';
  return <span className={className}>{label}</span>;
}
