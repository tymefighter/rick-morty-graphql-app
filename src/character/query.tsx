import { gql } from "@apollo/client";

const CHARACTER_FIELDS_PARTIAL = gql`
    fragment CharacterFieldsPartial on Character {
        id
        name
        status
        species
        gender
        image
    }
`;

export const GET_CHARACTERS = gql`
    query GetCharacters($page: Int) {
        characters(page: $page) {
            results {
                ...CharacterFieldsPartial
            }
        }
    }
    ${CHARACTER_FIELDS_PARTIAL}
`;

export const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
        character(id: $id) {
            ...CharacterFieldsPartial
            origin {
                id
                name
                dimension
            }
            location {
                id
                name
                dimension
            }
            episode {
                id
                name
                air_date
                episode
            }
        }
    }
    ${CHARACTER_FIELDS_PARTIAL}
`;