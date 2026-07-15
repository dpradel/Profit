import { useEffect, useRef, useState } from "react";
import { faqItems } from "../data/marketingData.jsx";

export function FaqSection() {
  const [open, setOpen] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("faq-revealed"); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="faq-section" ref={sectionRef}>
      <div className="faq-wrap">

        {/* Sidebar */}
        <div className="faq-sidebar">
          <span className="faq-eyebrow">FAQ</span>
          <h2 className="faq-h2">Perguntas<br />frequentes</h2>
          <p className="faq-lead">
            Não encontrou o que procura? Nossa equipe está disponível 24h
            por dia para te ajudar.
          </p>
          <div className="faq-support-card">
            <a href="#suporte" className="faq-support-link">Falar com suporte</a>
          </div>
        </div>

        {/* Accordion */}
        <div className="faq-items">
          {faqItems.map((item, i) => (
            <FaqItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function FaqItem({ q, a, isOpen, onToggle }) {
  const answerRef = useRef(null);

  return (
    <div className={`faq-item${isOpen ? " faq-item--open" : ""}`}>
      <button
        className="faq-q"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span>{q}</span>
        <svg
          className="faq-chevron"
          viewBox="0 0 20 20"
          fill="none"
          width="18"
          height="18"
          aria-hidden="true"
        >
          <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className="faq-answer-wrap"
        ref={answerRef}
        style={{
          maxHeight: isOpen
            ? (answerRef.current?.scrollHeight ?? 0) + "px"
            : "0px",
        }}
      >
        <p className="faq-answer">{a}</p>
      </div>
    </div>
  );
}
