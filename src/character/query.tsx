import {
    gql
} from "@apollo/client";

export const GET_CHARACTERS = gql`
    query GetCharacters($page: Int) {
        characters(page: $page) {
            results {
                id
                name
                status
                species
                type
                gender
                image
            }
        }
    }
`;

export const GET_CHARACTER = gql`
    query GetCharacter($id: ID) {
        character(id: $id) {
            id
            name
            status
            species
            type
            gender
            origin
            location
            image
            episode
        }
    }
`;