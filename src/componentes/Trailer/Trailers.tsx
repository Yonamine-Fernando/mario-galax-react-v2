import CarroselButton from "../Button/Button";
import trailersData from "./Trailer.data";
import { useState } from "react";

import nebulaBg from "../../assets/images/nebulosa-quad.webp";

function Trailers() {
  const [activeIndex, setActiveIndex] = useState(0);
  function nextTrailer() {
    setActiveIndex((current) => (current + 1) % trailersData.length);
  }

  function prevTrailer() {
    setActiveIndex((current) => (current - 1 + trailersData.length) % trailersData.length);
  }
  return (
    <section
      id="trailers"
      className="overflow-hidden bg-cover bg-center bg-no-repeat px-5 py-20 text-white "
      aria-labelledby="trailers-title"
      style={{ backgroundImage: `url(${nebulaBg})` }}
    >
      <div className="trailers__carousel mx-auto w-full max-w-5xl">
        <div className="trailers__viewport overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-950/80 p-3 shadow-[0_0_40px_rgba(56,189,248,0.15)]">
          <ul className="m-0 list-none p-0">
            {trailersData.map(
              (trailer, index) =>
                index === activeIndex && (
                  <li key={trailer.id} className="flex flex-col items-center gap-4">
                    <p className="text-center text-xl font-bold text-white">{trailer.title}</p>

                    <iframe
                      className="block aspect-video w-full rounded-2xl border-0 bg-black"
                      src={`https://www.youtube-nocookie.com/embed/${trailer.videoId}`}
                      title={trailer.title}
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </li>
                ),
            )}
          </ul>
        </div>

        <div className="mt-6 flex w-full items-center justify-center gap-5 mb-10">
          <CarroselButton label="Trailer anterior" direction="prev" onClick={prevTrailer} />

          <div className="flex items-center justify-center gap-3">
            {trailersData.map((trailer, index) => (
              <button
                key={trailer.id}
                type="button"
                className={`grid size-9 place-items-center rounded-full border text-amber-300 transition hover:scale-110 ${
                  index === activeIndex
                    ? "border-amber-300 bg-amber-300/15 shadow-[0_0_16px_rgba(251,191,36,0.55)]"
                    : "border-white/20 bg-slate-900/80"
                }`}
                aria-label={`Ir para ${trailer.title}`}
                aria-pressed={index === activeIndex}
                onClick={() => setActiveIndex(index)}
              >
                ★
              </button>
            ))}
          </div>

          <CarroselButton label="Próximo trailer" direction="next" onClick={nextTrailer} />
        </div>
      </div>
    </section>
  );
}

export default Trailers;
