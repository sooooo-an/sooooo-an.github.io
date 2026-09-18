import { siteConfig } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <span className="footer-copy">
          © {year} {siteConfig.name}
        </span>
        <div className="footer-links">
          <a href={siteConfig.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="/rss.xml">RSS</a>
          <a href={`mailto:${siteConfig.email}`}>Email</a>
        </div>
      </div>
    </footer>
  );
}
