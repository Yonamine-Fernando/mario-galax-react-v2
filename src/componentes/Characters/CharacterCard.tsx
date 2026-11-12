export type CharacterPosition = "mario" | "luigi" | "peach" | "rosalina" | "yoshi" | "bowser-jr";

type CharacterCardProps = {
  src: string;
  alt: string;
  name: string;
  description?: string;
  position: CharacterPosition;
};

function CharacterCard({ src, alt, name, description, position }: CharacterCardProps) {
  return (
    <div className={`character character--${position}`}>
      <img src={src} alt={alt} className="character-image" />
      <h2 className="character-name">{name}</h2>
      {description && <p className="character-description">{description}</p>}
    </div>
  );
}

export default CharacterCard;
