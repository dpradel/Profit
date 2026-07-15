export function ProSectionHeading({ eyebrow, title, children, align = "center" }) {
  return (
    <div className={`pro-section-heading ${align === "left" ? "left" : ""}`}>
      {eyebrow ? <p>{eyebrow}</p> : null}
      <h2>{title}</h2>
      {children ? <div className="pro-section-copy">{children}</div> : null}
    </div>
  );
}
