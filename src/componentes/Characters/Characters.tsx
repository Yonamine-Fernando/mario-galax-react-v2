import CharacterCard from "./CharacterCard";
import characters from "./characters.data";
import CharactersParticles from "./CharactersParticules";

function Characters() {
  return (
    <div className="characters" id="characters">
      <CharactersParticles />
      <div className="characters-stage">
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
    </div>
  );
}

export default Characters;
