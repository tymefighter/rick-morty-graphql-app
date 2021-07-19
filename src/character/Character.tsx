import { useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import ErrorComponent from "../Common/ErrorComponent";
import LoadingComponent from "../Common/LoadingComponent";
import { Character } from "../types";
import { GET_CHARACTER } from "./query";

interface ParamsType {
    characterId: string;
};

function Character() {

    const { characterId } = useParams<ParamsType>();
    const {data, loading, error} = useQuery(GET_CHARACTER, {
        variables: {
            id: characterId
        }
    });
    const history = useHistory();

    if(loading) return <LoadingComponent />;

    if(error) return <ErrorComponent message={error.message} />;

    const character = data.character as Character;

    return (
        <div className="character">
            <div className="character__main">
                <img src={character.image} alt={character.name} />
                <div className="character__main-info">
                    <h1>{character.name}</h1>
                    <p>Status: {character.status}</p>
                    <p>Species: {character.species}</p>
                    <p>Gender: {character.gender}</p>
                </div>
            </div>
            <div className="character__info">
                <h2 className="character__info-heading">Places</h2>
                <table className="character__info-table">
                    <tr>
                        <th>Type</th>
                        <th>Place</th>
                        <th>Dimension</th>
                    </tr>
                    <tr>
                        <td>Origin</td>
                        <td>{character.origin.name}</td>
                        <td>{character.origin.dimension}</td>
                    </tr>
                    <tr>
                        <td>Location</td>
                        <td>{character.location.name}</td>
                        <td>{character.location.dimension}</td>
                    </tr>
                </table>
            </div>
            <div className="character__info">
                <h2 className="character__info-heading">Episodes</h2>
                <table className="character__info-table">
                    <tr>
                        <th>Name</th>
                        <th>Episode</th>
                        <th>Air Date</th>
                    </tr>
                    {character.episode.map(episode => 
                        <tr key={episode.id}
                            onClick={() => {history.push(`/episodes/${episode.id}`)}}>
                            <td>{episode.name}</td>
                            <td>{episode.episode}</td>
                            <td>{episode.air_date}</td>
                        </tr>
                    )}
                </table>
            </div>
        </div>
    );
}

export default Character;