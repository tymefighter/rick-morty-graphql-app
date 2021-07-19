import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CharacterList from "../Common/CharacterList";
import ErrorComponent from "../Common/ErrorComponent";
import LoadingComponent from "../Common/LoadingComponent";
import { Episode as EpisodeType } from "../types";
import { GET_EPISODE } from "./query";

interface ParamsType {
    episodeId: string;
};

function Episode() {

    const { episodeId } = useParams<ParamsType>();
    const {data, loading, error} = useQuery(GET_EPISODE, {
        variables: {
            id: episodeId
        }
    });

    if(loading) return <LoadingComponent />;

    if(error) return <ErrorComponent message={error.message} />;

    const episode = data.episode as EpisodeType;

    return (
        <div className="episode">
            <div className="episode__main-info">
                <h1 className="episode__main-info-heading">{episode.name}</h1>
                <p className="episode__main-info-para">Episode: {episode.episode}</p>
                <p className="episode__main-info-para">Air Date: {episode.air_date}</p>
            </div>
            <div className="location__info">
                <h2 className="location__info-heading">Characters</h2>
                <CharacterList characterList={episode.characters} />
            </div>
        </div>
    );
}

export default Episode;