import { compare } from "../data/umbrelProData.jsx";

function CellText({ value }) {
  return String(value)
    .split("\n")
    .map((line, index) => (
      <span key={`${line}-${index}`}>
        {line}
        {index < String(value).split("\n").length - 1 ? <br /> : null}
      </span>
    ));
}

export function ProCompareTable() {
  return (
    <section className="pro-compare" id="compare">
      <div className="pro-section-heading">
        <h2>Qual Profit combina com sua rotina?</h2>
        <div className="pro-section-copy">
          <p>Duas experiências da mesma plataforma. Uma escolha para o seu momento como trader.</p>
        </div>
      </div>

      <div className="compare-table">
        <div className="compare-label" />
        {compare.products.map((product) => (
          <div className="compare-product" key={product.title}>
            <img src={product.image} alt="" loading="lazy" />
            <div>
              <h3>
                {product.title}
                {product.badge ? <span>{product.badge}</span> : null}
              </h3>
              <p>{product.description}</p>
              <strong>{product.price}</strong>
              <div className="compare-actions">
                <a href={`${import.meta.env.BASE_URL}#comece`}>Testar grátis</a>
                <a href={product.title === "Profit Ultra" ? "#/profit-ultra" : "#/recursos"}>Explorar</a>
              </div>
            </div>
          </div>
        ))}

        {compare.rows.map(([label, home, pro]) => (
          <div className="compare-row" key={label}>
            <div className="compare-label">{label}</div>
            <div className="compare-cell">
              <CellText value={home} />
            </div>
            <div className="compare-cell compare-cell-pro">
              <CellText value={pro} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
