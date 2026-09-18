import Link from 'next/link';
import { t, type Locale } from '@/lib/i18n/dictionary';

export default function SectionHeader({
  label,
  moreHref,
  locale = 'ko',
}: {
  label: string;
  moreHref?: string;
  locale?: Locale;
}) {
  const dict = t(locale);
  return (
    <div className="section-header">
      <span className="section-label">{label}</span>
      {moreHref ? (
        <Link href={moreHref} className="section-more">
          {dict.sectionMore}
        </Link>
      ) : null}
    </div>
  );
}
