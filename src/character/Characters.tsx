import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import client from "../client";
import { GET_CHARACTERS } from "./query";

function Characters() {

    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState(1);
    const [error, setError] = useState("")

    const scrollHandler = useCallback((event: React.UIEvent<HTMLDivElement>) => {
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
            .then({data as CharacterPartial} => )

            setNextPage(nextPage + 1);
        }
    })

    return (
        <div onScroll={(event) => {}}>

        </div>
    );
}

export default Characters;