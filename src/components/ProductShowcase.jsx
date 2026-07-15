import { productColumns } from "../data/siteData.jsx";

function ProductColumn({ product }) {
  return (
    <article className={`product product-${product.type}`}>
      <div className="mini-grid">
        {product.cards.map((src, index) => (
          <div className={`mini-card${product.type === "os" ? " purple" : ""}`} key={src}>
            <img src={src} alt="" />
            <h3>{index + 1}</h3>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ProductShowcase() {
  return (
    <section className="product-grid product-grid-mini">
      {productColumns.map((product) => (
        <ProductColumn key={product.type} product={product} />
      ))}
    </section>
  );
}
