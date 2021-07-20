import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import client from "../client";
import { GET_CHARACTERS, GET_NUM_CHARACTER_PAGES } from "./query";
import { CharacterPartial } from "../types";
import ErrorComponent from "../Common/ErrorComponent";
import CharacterCard from "./CharacterCard";

import "../styles/Characters.scss";

function getCharacterPage(
    page: number,
    setCharacters: React.Dispatch<React.SetStateAction<CharacterPartial[]> >,
    setNextPage: React.Dispatch<React.SetStateAction<number> >,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined> >,
    setLoading: React.Dispatch<React.SetStateAction<boolean> >
) {
    setLoading(true);
    client.query({
        query: GET_CHARACTERS,
        fetchPolicy: "cache-first",
        variables: {
            page: page
        }
    })
    .then(result => {
        const data = result.data.characters.results as CharacterPartial[];
        setCharacters((prevCharacters) => [...prevCharacters, ...data]);
        setLoading(false);
    })
    .catch(error => setErrorMessage(error.message));

    setNextPage(page => page + 1);
}

function Characters() {

    const numPagesQuery = useQuery(GET_NUM_CHARACTER_PAGES);
    const [characters, setCharacters] = useState<CharacterPartial[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCharacterPage(
            1, setCharacters, setNextPage, setErrorMessage, setLoading
        );
    }, []);

    const scrollHandler = useCallback((event: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const scrollTop = event.currentTarget.scrollTop;
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollFraction = scrollTop / scrollHeight;

        if(!numPagesQuery.loading && scrollFraction > 0.5 && !loading
            && (numPagesQuery.data.episodes.info.pages as number) >= nextPage) {

            getCharacterPage(
                nextPage, setCharacters, setNextPage, setErrorMessage, setLoading
            );
        }
    }, [numPagesQuery, loading, characters, nextPage]);

    let error = undefined;
    if(numPagesQuery.error) error = numPagesQuery.error.message;
    else if(errorMessage) error = errorMessage;

    if(error) return <ErrorComponent message={error} />;

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