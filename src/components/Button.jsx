import { useRef } from "react";
import { useSpecularFx } from "./fx/SpecularButton.jsx";
import "./fx/SpecularButton.css";

const variantClass = {
  light: "button-light",
  glass: "button-glass",
  dark: "button-dark",
  primary: "button-primary",
  gradient: "button-gradient",
};

const SPECULAR_VARIANTS = new Set(["primary", "gradient"]);

const SPECULAR_PROPS = {
  radius: 999,
  lineColor: "#ffffff",
  baseColor: "#9adcff",
  intensity: 1,
  shineSize: 10,
  shineFade: 40,
  thickness: 1.1,
  speed: 0.05,
  followMouse: true,
  proximity: 410,
  autoAnimate: false,
};

function SpecularAnchor({ href, children, className }) {
  const btnRef = useRef(null);
  const fxRef = useRef(null);
  const propsRef = useRef(SPECULAR_PROPS);

  useSpecularFx(btnRef, fxRef, propsRef);

  return (
    <a ref={btnRef} className={`${className} button--specular`} href={href}>
      <span ref={fxRef} className="specular-button__fx" aria-hidden="true" />
      <span className="button__label">{children}</span>
    </a>
  );
}

export function Button({ href, children, variant = "dark" }) {
  const cls = `button ${variantClass[variant] ?? variantClass.dark}`;

  if (SPECULAR_VARIANTS.has(variant)) {
    return (
      <SpecularAnchor href={href} className={cls}>
        {children}
      </SpecularAnchor>
    );
  }

  return (
    <a className={cls} href={href}>
      {children}
    </a>
  );
}

export function ButtonRow({ actions, compact = false, className = "" }) {
  return (
    <div className={`button-row${compact ? " compact" : ""}${className ? ` ${className}` : ""}`}>
      {actions.map((action) => (
        <Button key={`${action.label}-${action.href}`} href={action.href} variant={action.variant}>
          {action.label}
        </Button>
      ))}
    </div>
  );
}
