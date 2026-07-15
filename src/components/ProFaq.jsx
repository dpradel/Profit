import { useState } from "react";
import { faqs } from "../data/umbrelProData.jsx";

export function ProFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="pro-faq" id="faq">
      <div className="pro-section-heading left">
        <h2>Perguntas frequentes</h2>
        <div className="pro-section-copy">
          <p>O essencial para entender o Profit Ultra antes de começar.</p>
        </div>
      </div>

      <div className="faq-list">
        {faqs.map((item, index) => {
          const expanded = open === index;

          return (
            <article className={`faq-item${expanded ? " is-open" : ""}`} key={item.question}>
              <button type="button" onClick={() => setOpen(expanded ? -1 : index)} aria-expanded={expanded}>
                <span>{item.question}</span>
                <b>{expanded ? "-" : "+"}</b>
              </button>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
