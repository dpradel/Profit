import { useState } from "react";
import { proNavLinks } from "../data/umbrelProData.jsx";
import { Logo } from "./Logo.jsx";

function CartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M7.2 19.4a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4Zm10 0a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM4.3 3.2H1.8v2h1.1l2.4 10.3c.2.8.9 1.4 1.8 1.4h10.7c.8 0 1.5-.5 1.8-1.3L22 8H6l-.5-2.1c-.2-1.5-.5-2.7-1.2-2.7Z" />
    </svg>
  );
}

export function ProductPageHeader({
  navLinks = proNavLinks,
  ariaLabel = "Navegação do produto",
  buyHref = "/profit-ultra#buy",
  actionLabel = "Testar grátis",
  flag = "https://umbrel.com/flags/br.svg",
  flagAlt = "Brasil",
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className={`product-nav${open ? " is-open" : ""}`} aria-label={ariaLabel}>
      <div className="product-nav-shell">
        <a className="product-brand" href={import.meta.env.BASE_URL} aria-label="Profit home">
          <Logo />
        </a>

        <nav className="product-nav-links" aria-label="Product links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="product-nav-actions">
          <img src={flag} alt={flagAlt} className="flag" />
          <a className="cart-link" href={`${import.meta.env.BASE_URL}#comece`} aria-label="Carrinho">
            <CartIcon />
          </a>
          <a className="product-buy" href={buyHref}>
            {actionLabel}
          </a>
          <button
            className="menu-button product-menu"
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className="product-mobile-panel">
        {navLinks.map((link) => (
          <a key={`mobile-${link.href}`} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}
