type TrailerButtonProps = {
  label: string;
  onClick: () => void;
  direction: "prev" | "next";
};

function CarroselButton({ label, onClick, direction }: TrailerButtonProps) {
  return (
    <button
      type="button"
      className={`trailer__arrow trailer__arrow--${direction}`}
      aria-label={label}
      onClick={onClick}
    >
      <span aria-hidden="true">{direction === "prev" ? "<" : ">"}</span>
    </button>
  );
}

export default CarroselButton;
