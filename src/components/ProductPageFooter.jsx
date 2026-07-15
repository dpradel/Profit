import { footerLinks, socialLinks } from "../data/siteData.jsx";

export function ProductPageFooter({
  title = "A plataforma líder dos traders, pronta para a sua rotina.",
  subtitle = "Comece grátis, explore os recursos e evolua para o plano ideal quando fizer sentido.",
  actionHref = "/profit-ultra#buy",
  actionLabel = "Testar grátis",
}) {
  return (
    <footer className="pro-footer">
      <section className="pro-final-cta">
        <h2>{title}</h2>
        <p>{subtitle}</p>
        <a href={actionHref}>{actionLabel}</a>
      </section>

      <section className="pro-newsletter">
        <div>
          <h3>Receba novidades</h3>
          <p>Atualizações de produto, novos recursos e conteúdos para evoluir sua rotina no mercado.</p>
        </div>
        <form>
          <input type="email" placeholder="Email" aria-label="Email" />
          <button type="submit">Cadastrar</button>
        </form>
      </section>

      <div className="pro-footer-bottom">
        <div className="socials">
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="footer-links">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
