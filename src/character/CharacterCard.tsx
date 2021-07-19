import { CharacterPartial } from "../types";

interface CharacterCardProps {
    character: CharacterPartial;
    className?: string;
};

function CharacterCard({character, className}: CharacterCardProps) {
    return <div></div>;
}

export default CharacterCard;