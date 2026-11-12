import CharacterCard from "./CharacterCard";
import characters from "./characters.data";

function Characters() {
  return (
    <div className="characters">
      {characters.map((character) => (
        <CharacterCard
          key={character.id}
          src={character.src}
          alt={character.alt}
          name={character.name}
          description={character.description}
          position={character.position}
        />
      ))}
    </div>
  );
}

export default Characters;
