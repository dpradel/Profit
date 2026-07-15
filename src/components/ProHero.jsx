import { proHero } from "../data/umbrelProData.jsx";
import heroPoster from "../assets/umbrel-pro-hero-poster.png";

export function ProHero() {
  return (
    <section className="pro-page-hero" id="overview">
      <img className="pro-hero-poster" src={heroPoster} alt="" />
      <video
        className="pro-hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={(event) => {
          event.currentTarget.currentTime = 8;
        }}
      >
        <source src={`${proHero.video}#t=8`} type="video/mp4" />
      </video>

      <div className="pro-hero-vignette" />

      <div className="pro-hero-bottom">
        <div className="pro-hero-title">
          <h1>
            {proHero.title}
            <br />
            {proHero.subtitle}
          </h1>
        </div>

        <div className="pro-buy-card">
          <div className="pro-buy-row">
            <span>{proHero.price}</span>
            <a href={proHero.action.href}>{proHero.action.label}</a>
          </div>
          <p>{proHero.delivery}</p>
        </div>
      </div>
    </section>
  );
}
