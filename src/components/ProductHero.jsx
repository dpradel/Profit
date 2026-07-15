import { umbrelPro } from "../data/siteData.jsx";
import { ButtonRow } from "./Button.jsx";

export function ProductHero() {
  return (
    <section className="pro-hero">
      <img className="pro-hero-bg" src={umbrelPro.image} alt="" />
      <div className="pro-content">
        {umbrelPro.label ? <span className="pill-new">{umbrelPro.label}</span> : null}
        <h2>{umbrelPro.title}</h2>
        {umbrelPro.copy.map((paragraph, index) => (
          <p key={paragraph} className={index === 0 ? "lead" : undefined}>
            {paragraph}
          </p>
        ))}
        {umbrelPro.bullets?.length ? (
          <ul className="pro-benefits">
            {umbrelPro.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
        {umbrelPro.price ? <p className="price">{umbrelPro.price}</p> : null}
        {umbrelPro.shipping ? <p className="shipping">{umbrelPro.shipping}</p> : null}
        {umbrelPro.actions?.length ? <ButtonRow actions={umbrelPro.actions} /> : null}
      </div>
    </section>
  );
}
