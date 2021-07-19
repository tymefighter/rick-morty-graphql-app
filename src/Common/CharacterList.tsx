import { CharacterPartial } from "../types";
import { useHistory } from "react-router-dom";

import "../styles/CharacterList.scss";

interface CharacterListProps {
    characterList: CharacterPartial[];
};

function CharacterList({characterList}: CharacterListProps) {

    const history = useHistory();

    return (
        <table className="character-list-table">
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Status</th>
                <th>Species</th>
                <th>Gender</th>
            </tr>
            {characterList.map(character => 
                <tr onClick={() => history.push(`/characters/${character.id}`)}
                    key={character.id}>
                    <td>
                        <img className="character-list-table__image"
                            src={character.image} alt={character.name} />
                    </td>
                    <td>{character.name}</td>
                    <td>{character.status}</td>
                    <td>{character.species}</td>
                    <td>{character.gender}</td>
                </tr>
            )}
        </table>
    );
}

export default CharacterList;