import { CharacterPartial } from "../types";
import Badge from "../Common/Badge";

import "../styles/CharacterCard.scss";

interface CharacterCardProps {
    character: CharacterPartial;
    height?: string;
    width?: string;
};

function CharacterCard({character, height, width}: CharacterCardProps) {
    return (
        <div className="character-card" style={{height: height, width: width}}>
            <img className="character-card__img" 
                src={character.image} alt={character.name} />
            <div className="character-card__row">
                <h2 className="character-card__name">{character.name}</h2>
                <Badge badgeText={character.status} />
            </div>
            <p className="character-card__info">
                Species: {character.species}
            </p>
            <p className="character-card__info">
                Gender: {character.gender}
            </p>
        </div>
    );
}

export default CharacterCard;