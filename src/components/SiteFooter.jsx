import { footerNav, footerLegal, socialLinks } from "../data/siteData.jsx";

const SOCIAL_ICONS = {
  Facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  YouTube: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="#07090f" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  ),
};

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">

        {/* ── Top grid: brand + nav ── */}
        <div className="sf-grid">

          {/* Brand column */}
          <div className="sf-brand">
            <a href={import.meta.env.BASE_URL} className="sf-logo" aria-label="Profit">
              <img src={`${import.meta.env.BASE_URL}logo-do-profit.svg`} alt="Profit" width="96" height="20" />
            </a>
            <ul className="sf-socials" aria-label="Redes sociais">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {SOCIAL_ICONS[s.label]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns */}
          <nav className="sf-nav" aria-label="Links do rodapé">
            {footerNav.map((col) => (
              <div className="sf-col" key={col.heading}>
                <span className="sf-col-heading">{col.heading}</span>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href}>{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ── Bottom bar ── */}
        <div className="sf-bottom">
          <p className="sf-copyright">© {new Date().getFullYear()} Nelogica. Todos os direitos reservados.</p>
          <ul className="sf-legal-links">
            {footerLegal.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
          </ul>
        </div>

        {/* ── Disclaimer ── */}
        <p className="sf-disclaimer">
          Aviso: A Nelogica é uma provedora de serviços de tecnologia e opera como facilitadora para recebimento,
          envio e análise de informações para negociação de ativos, tendo por base as decisões dos Usuários.
          A Nelogica não é, sob qualquer forma ou interpretação, parte ou intermediária de qualquer operação
          ou transação realizada por meio de seus sistemas, tampouco participa, faz ou presta serviços de
          recomendações de investimentos. Portanto, a Nelogica não pode ser considerada ou equiparada a um
          agente ou analista de investimentos dos Usuários. Para mais informações, acesse os{" "}
          <a href="#">Termos de Uso</a> disponíveis nesta página.
        </p>

      </div>
    </footer>
  );
}
