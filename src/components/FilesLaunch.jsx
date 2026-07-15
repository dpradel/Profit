import { useRef } from "react";
import { filesLaunch } from "../data/siteData.jsx";
import { useInView } from "../hooks/useInView.js";
import { ButtonRow } from "./Button.jsx";

export function FilesLaunch() {
  const ref = useRef(null);
  const inView = useInView(ref);

  return (
    <section className={`files-launch${inView ? " is-visible" : ""}`} ref={ref}>
      <div className="files-card">
        <video
          className="files-card-video"
          src={filesLaunch.video}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="files-card-overlay" aria-hidden="true" />
        <div className="files-copy">
          <img className="files-ultra-logo" src={`${import.meta.env.BASE_URL}logo-profit-ultra.svg`} alt="Profit Ultra" />
          <h2 className="files-title-text">{filesLaunch.title}</h2>
          <p className="files-subtitle">{filesLaunch.subtitle}</p>
          <ButtonRow actions={filesLaunch.actions} compact />
        </div>
      </div>
    </section>
  );
}
