


type CharacterCardProps={
    src: string;
    alt:string;
    name:string;
    description:string;
}


function CharacterCard ({ src, alt, name, description }: CharacterCardProps) {
    return(
        <div className="character-card">
            <img src={src} alt={alt} className="character-image" />
            <h2 className="character-name">{name}</h2>
            <p className="character-description">{description}</p>
        </div>
    )
}

export default CharacterCard;