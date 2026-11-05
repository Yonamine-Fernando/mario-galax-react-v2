import starhero from "../assets/images/estrela-min.webp";
type StarProps = {
  position: "left" | "right" | "center" | "top";
  size: number;
};

function Star({ position, size }: StarProps) {
  return (
    <img
      className={`hero__star hero__star--${position}`}
      src={starhero}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      decoding="async"
    />
  );
}
export default Star;
