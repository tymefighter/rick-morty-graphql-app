import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import client from "../client";
import { GET_CHARACTERS } from "./query";
import { CharacterPartial } from "../types";
import ErrorComponent from "../Common/ErrorComponent";
import CharacterCard from "./CharacterCard";

import "../styles/Characters.scss";
import { useEffect } from "react";

const INIT_NUM_PAGES = 1;
const NUM_PAGES_PER_QUERY = 1;

function getCharacterPages(
    startPage: number, numPages: number,
    setCharacters: (characters: React.SetStateAction<CharacterPartial[]>) => void, 
    setNextPage: (nextPage: React.SetStateAction<number>) => void, 
    setErrorMessage: (errorMessage: React.SetStateAction<string | undefined>) => void
) {
    console.log(startPage, numPages)
    for(let page = 0;page < numPages;page++) {
        client.query({
            query: GET_CHARACTERS,
            fetchPolicy: "cache-first",
            variables: {
                page: startPage + page
            }
        })
        .then(result => {
            const data = result.data.characters.results as CharacterPartial[];
            setCharacters((prevCharacters) => [...prevCharacters, ...data]);
        })
        .catch(error => setErrorMessage(error.message));
    }

    setNextPage(startPage + numPages);
}

function Characters() {

    const [characters, setCharacters] = useState<CharacterPartial[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        getCharacterPages(
            1, INIT_NUM_PAGES,
            setCharacters, setNextPage, setErrorMessage
        );
    }, [])

    const scrollHandler = useCallback((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop = event.currentTarget.scrollTop;
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollFraction = scrollTop / scrollHeight;

        // if(scrollFraction > 0.7) {
        //     getCharacterPages(
        //         nextPage, NUM_PAGES_PER_QUERY,
        //         setCharacters, setNextPage, setErrorMessage
        //     );
        // }
    }, [characters, nextPage]);

    if(errorMessage) return <ErrorComponent message={errorMessage} />;

    return (
        <div className="characters" onScroll={scrollHandler}>
            {characters.map(character => 
                <Link key={character.id}
                    className="characters__character-link"
                    to={`/characters/${character.id}`}>
                    <CharacterCard character={character} />
                </Link>
            )}
        </div>
    );
}

export default Characters;