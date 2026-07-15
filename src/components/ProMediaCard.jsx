export function ProMediaCard({ title, description, image, video, className = "" }) {
  return (
    <article className={`pro-media-card ${className}`}>
      <div className="pro-media-copy">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="pro-media-visual">
        {video ? (
          <video autoPlay muted loop playsInline preload="metadata">
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <img src={image} alt="" loading="lazy" />
        )}
      </div>
    </article>
  );
}
