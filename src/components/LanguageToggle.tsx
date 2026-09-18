'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n/dictionary';

export default function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? '/';

  const targetHref =
    locale === 'en'
      ? pathname.replace(/^\/en(\/|$)/, '/') || '/'
      : pathname === '/'
        ? '/en/'
        : `/en${pathname}`;

  const label = locale === 'en' ? 'KO' : 'EN';

  return (
    <Link href={targetHref} className="lang-toggle" aria-label="Switch language">
      {label}
    </Link>
  );
}
