import { gql } from "@apollo/client";

const EPISODE_FIELDS_PARTIAL = gql`
    fragment EpisodeFieldsPartial on Episode {
        id: string;
        name: string;
        air_date: string;
        episode: string;
    }
`;

export const GET_EPISODES = gql`
    query GetEpisodes($page: Int) {
        episodes(page: $page) {
            results {
                ...EpisodeFieldsPartial
            }
        }
    }
    ${EPISODE_FIELDS_PARTIAL}
`;  

export const GET_EPISODE = gql`
    query GetEpisode($id: ID) {
        episode(id: $id) {
            ...EpisodeFieldsPartial
            characters {
                id
                name
                status
                species
                gender
                image
            }
        }
    }
    ${EPISODE_FIELDS_PARTIAL}
`;