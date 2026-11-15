import { useEffect } from "react";
import "particles.js";

const CHARACTERS_SECTION_ID = "characters";
const PARTICLES_CONTAINER_ID = "characters-particles-js";
const MOBILE_BREAKPOINT = "(max-width: 767.98px)";

function readParticleColors() {
  const styles = getComputedStyle(document.documentElement);

  return {
    dot: styles.getPropertyValue("--particles-dot").trim() || "#00f5ff",
    line: styles.getPropertyValue("--particles-line").trim() || "#00d9ff",
    accent: styles.getPropertyValue("--particles-accent").trim() || "#0096c7",
  };
}

function isMobileViewport() {
  return typeof window.matchMedia === "function" && window.matchMedia(MOBILE_BREAKPOINT).matches;
}

function createParticlesConfig() {
  const mobile = isMobileViewport();
  const colors = readParticleColors();

  return {
    particles: {
      number: {
        value: mobile ? 80 : 140,
        density: { enable: true, value_area: 800 },
      },
      color: { value: colors.dot },
      shape: {
        type: "circle",
        stroke: {
          width: 0.5,
          color: colors.accent,
        },
      },
      opacity: {
        value: 0.7,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.3,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 160,
        color: colors.line,
        opacity: 0.4,
        width: 1.2,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "bounce",
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: !mobile, mode: "push" },
        resize: true,
      },
      modes: {
        grab: {
          distance: 220,
          line_linked: { opacity: 0.8 },
        },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: !mobile,
  };
}

function CharactersParticles() {
  useEffect(() => {
    const section = document.getElementById(CHARACTERS_SECTION_ID);
    const container = document.getElementById(PARTICLES_CONTAINER_ID);

    if (!section || !container || typeof window.particlesJS !== "function") {
      return;
    }

    window.particlesJS(PARTICLES_CONTAINER_ID, createParticlesConfig());

    const particleInstance = window.pJSDom?.find(
      ({ pJS }) => pJS.canvas.el.parentElement === container,
    );

    if (!particleInstance) {
      return;
    }

    const particles = particleInstance.pJS;

    let viewportPaused = false;

    function pauseParticleAnimation() {
      if (viewportPaused) return;

      const animationFrame = particles.fn.drawAnimFrame;

      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }

      viewportPaused = true;
    }

    function resumeParticleAnimation() {
      if (!viewportPaused) return;

      viewportPaused = false;
      particles.fn.vendors.draw();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            resumeParticleAnimation();
          } else {
            pauseParticleAnimation();
          }
        });
      },
      {
        root: null,
        threshold: 0,
        rootMargin: "0px",
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();

      const instances = window.pJSDom;

      particles.fn.vendors.destroypJS();

      window.pJSDom = instances?.filter((instance) => instance !== particleInstance) ?? [];
    };
  }, []);

  return (
    <div className="characters__particles-bg" aria-hidden="true">
      <div id={PARTICLES_CONTAINER_ID} />
    </div>
  );
}

export default CharactersParticles;
