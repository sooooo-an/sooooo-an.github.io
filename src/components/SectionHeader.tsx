import Link from 'next/link';

export default function SectionHeader({
  label,
  moreHref,
}: {
  label: string;
  moreHref?: string;
}) {
  return (
    <div className="section-header">
      <span className="section-label">{label}</span>
      {moreHref ? (
        <Link href={moreHref} className="section-more">
          전체 보기 →
        </Link>
      ) : null}
    </div>
  );
}
