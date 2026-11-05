import Star from "./Star";

import marioVideo from "../assets/videos/mario-clip-alpha.webm";
import yoshiVideo from "../assets/videos/yoshi-video-alpha.webm";
import planetVideo from "../assets/videos/planet-3d-alpha.webm";
import marioMp4 from "../assets/videos/mario-clip-min.mp4";
import yoshiMp4 from "../assets/videos/yoshi-video-min.mp4";
import planetMp4 from "../assets/videos/planet-3d-min.mp4";

function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-heading">
      <div className="hero__media-layer" aria-hidden="true">
        <video className="hero__mario" autoPlay loop muted playsInline>
          <source src={marioVideo} type="video/webm" />
          <source src={marioMp4} type="video/mp4" />
        </video>
        <video className="hero__yoshi" autoPlay loop muted playsInline>
          <source src={yoshiVideo} type="video/webm" />
          <source src={yoshiMp4} type="video/mp4" />
        </video>
        <video className="hero__planet" autoPlay loop muted playsInline>
          <source src={planetVideo} type="video/webm" />
          <source src={planetMp4} type="video/mp4" />
        </video>
        <Star size={72} position="left" />
        <Star size={100} position="center" />
        <Star size={30} position="right" />
        <Star size={30} position="top" />
      </div>
      <div className="hero__content-layer">
        <div className="hero__badge">NOS CINEMAS AGORA</div>
        <h1 id="hero-heading" className="hero__title">
          <span className="hero__title-line1">Super Mario</span>
          <span className="hero__title-line2">Galaxy: O Filme</span>
        </h1>
        <p className="hero__subtitle">UMA AVENTURA ÉPICA PELO COSMOS</p>
        <button type="button" className="hero__cta">
          Assistir Trailer
          <span className="hero__cta-icon" aria-hidden="true"></span>
        </button>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">ROLE PARA EXPLORAR</span>
      </div>
    </section>
  );
}

export default Hero;
