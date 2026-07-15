import { footerCards } from "../data/siteData.jsx";

export function FooterCards() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="footer-cards" id="suporte">
      {footerCards.map((card) => (
        <a className={`footer-card${card.size ? ` ${card.size}` : ""}`} href={card.href} key={card.title}>
          <span>{card.title}</span>
          <p>{card.text}</p>
          <b aria-hidden="true">↗</b>
        </a>
      ))}
      <form className="footer-card subscribe" onSubmit={handleSubmit}>
        <span>Receba novidades</span>
        <p>Atualizações de produto, novos recursos e conteúdos para evoluir sua rotina no mercado.</p>
        <label>
          <span className="sr-only">Email</span>
          <input type="email" placeholder="Email" />
          <button type="submit">Cadastrar</button>
        </label>
      </form>
    </section>
  );
}
