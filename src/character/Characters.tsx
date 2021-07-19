import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import client from "../client";
import { GET_CHARACTERS } from "./query";
import { CharacterPartial } from "../types";
import ErrorComponent from "../Common/ErrorComponent";
import CharacterCard from "./CharacterCard";

import "../styles/CharacterCard.scss";

function Characters() {

    const [characters, setCharacters] = useState<CharacterPartial[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

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
            .catch(error => setErrorMessage(error.message));

            setNextPage(nextPage + 1);
        }
    }, [nextPage]);

    if(errorMessage) return <ErrorComponent message={errorMessage} />;

    return (
        <div className="characters" onScroll={scrollHandler}>
            {characters.map(character => 
                <Link className="characters__character-link"
                    to={`/characters/${character.id}`}>
                    <CharacterCard character={character} />
                </Link>
            )}
        </div>
    );
}

export default Characters;