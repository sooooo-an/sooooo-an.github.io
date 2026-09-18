'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { siteConfig } from '@/lib/site';
import { t, localePath, type Locale } from '@/lib/i18n/dictionary';

export default function Header() {
  const pathname = usePathname() ?? '/';
  const locale: Locale = pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
  const dict = t(locale);

  const navItems = [
    { href: localePath(locale, '/'), label: dict.nav.home },
    { href: localePath(locale, '/projects/'), label: dict.nav.projects },
    { href: localePath(locale, '/writing/'), label: dict.nav.writing },
    { href: localePath(locale, '/about/'), label: dict.nav.about },
  ];

  const homeHref = locale === 'en' ? '/en/' : '/';

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href={homeHref} className="site-logo">
          {siteConfig.name}
        </Link>
        <nav className="site-nav">
          {navItems.map((item) => {
            const isActive =
              item.href === homeHref
                ? pathname === homeHref
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? 'nav-link nav-link-active' : 'nav-link'}
              >
                {item.label}
              </Link>
            );
          })}
          <LanguageToggle locale={locale} />
          <ThemeToggle locale={locale} />
        </nav>
      </div>
    </header>
  );
}
