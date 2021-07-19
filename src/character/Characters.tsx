import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import client from "../client";
import { GET_CHARACTERS } from "./query";
import { CharacterPartial } from "../types";

function Characters() {

    const [characters, setCharacters] = useState<CharacterPartial[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const [error, setError] = useState("")

    const scrollHandler = useCallback((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop = event.currentTarget.scrollTop;
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollFraction = scrollTop / scrollHeight;

        if(scrollFraction > 0.7) {
            client.query({
                query: GET_CHARACTERS,
                fetchPolicy: "cache-first",
                variables: {
                    page: nextPage
                }
            })
            .then(result => {
                const data = result.data.characters.results as CharacterPartial[];
                setCharacters([...characters, ...data]);
            })
            .catch(error => setError(error.message));

            setNextPage(nextPage + 1);
        }
    }, [nextPage]);

    return (
        <div onScroll={scrollHandler}>
            
        </div>
    );
}

export default Characters;