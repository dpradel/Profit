import { useState } from "react";
import { navLinks } from "../data/siteData.jsx";
import { Logo } from "./Logo.jsx";

function NavItem({ link }) {
  if (link.children) {
    return (
      <div className="nav-dropdown">
        <button type="button" className="nav-dropdown__trigger" aria-haspopup="true">
          {link.label}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="nav-dropdown__panel">
          {link.children.map((child) => (
            <a key={child.href} href={child.href}>
              {child.label}
            </a>
          ))}
        </div>
      </div>
    );
  }
  return <a href={link.href}>{link.label}</a>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`site-nav${open ? " is-open" : ""}`} aria-label="Primary navigation">
      <a className="brand" href="#/" aria-label="Profit home">
        <Logo />
      </a>

      <nav className="nav-links" aria-label="Main links">
        {navLinks.map((link) => (
          <NavItem key={link.label} link={link} />
        ))}
      </nav>

      <div className="nav-actions">
        <img src="https://umbrel.com/flags/br.svg" alt="Brazil" className="flag" />
        <button
          className="menu-button"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span></span>
          <span></span>
        </button>
      </div>

      <div className="mobile-panel" data-mobile-panel>
        {navLinks.flatMap((link) =>
          link.children
            ? link.children.map((child) => (
                <a key={`mobile-${child.href}`} href={child.href}>
                  {child.label}
                </a>
              ))
            : (
                <a key={`mobile-${link.href}`} href={link.href}>
                  {link.label}
                </a>
              )
        )}
      </div>
    </header>
  );
}
