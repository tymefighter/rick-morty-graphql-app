import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import client from "../client";
import { GET_CHARACTERS } from "./query";
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

        if(scrollFraction > 0.7 && !loading) {
            console.log(nextPage);
            getCharacterPage(
                nextPage, setCharacters, setNextPage, setErrorMessage, setLoading
            );
        }
    }, [loading, characters, nextPage]);

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