import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import client from "../client";
import { GET_EPISODES, GET_NUM_EPISODE_PAGES } from "./query";
import { EpisodePartial } from "../types";
import ErrorComponent from "../Common/ErrorComponent";
import { useQuery } from "@apollo/client";

import "../styles/Episodes.scss";

function getEpisodePage(
    page: number,
    setEpisodes: React.Dispatch<React.SetStateAction<EpisodePartial[]> >,
    setNextPage: React.Dispatch<React.SetStateAction<number> >,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined> >,
    setLoading: React.Dispatch<React.SetStateAction<boolean> >
) {
    setLoading(true);
    client.query({
        query: GET_EPISODES,
        fetchPolicy: "cache-first",
        variables: {
            page: page
        }
    })
    .then(result => {
        const data = result.data.episodes.results as EpisodePartial[];
        setEpisodes((prevEpisodes) => [...prevEpisodes, ...data]);
        setLoading(false);
    })
    .catch(error => setErrorMessage(error.message));

    setNextPage(page => page + 1);
}

function Episodes() {

    const history = useHistory();
    const numPagesQuery = useQuery(GET_NUM_EPISODE_PAGES);
    const [episodes, setEpisodes] = useState<EpisodePartial[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEpisodePage(
            1, setEpisodes, setNextPage, setErrorMessage, setLoading
        );
    }, []);

    const scrollHandler = useCallback((event: React.UIEvent<HTMLElement, UIEvent>) => {
        const scrollTop = event.currentTarget.scrollTop;
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollFraction = scrollTop / scrollHeight;

        console.log(scrollFraction)

        if(!numPagesQuery.loading && scrollFraction > 0.3 && !loading
            && (numPagesQuery.data.episodes.info.pages as number) >= nextPage) {
                
            getEpisodePage(
                nextPage, setEpisodes, setNextPage, setErrorMessage, setLoading
            );
        }
    }, [numPagesQuery, loading, episodes, nextPage]);

    let error = undefined;
    if(numPagesQuery.error) error = numPagesQuery.error.message;
    else if(errorMessage) error = errorMessage;

    if(error) return <ErrorComponent message={error} />;

    return (
        <div className="episodes" onScroll={scrollHandler}>
            <table className="episode-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Episode</th>
                        <th>Air Date</th>
                    </tr>
                </thead>
                <tbody>
                    {episodes.map(episode => 
                        <tr key={episode.id}
                            onClick={() => history.push(`/episodes/${episode.id}`)}>
                            <td>{episode.name}</td>
                            <td>{episode.episode}</td>
                            <td>{episode.air_date}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Episodes;