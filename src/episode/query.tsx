import { gql } from "@apollo/client";

const EPISODE_FIELDS_PARTIAL = gql`
    fragment EpisodeFieldsPartial on Episode {
        id
        name
        air_date
        episode
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
    query GetEpisode($id: ID!) {
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

export const GET_NUM_EPISODE_PAGES = gql`
    query GetNumEpisodePages {
        episodes(page: 1) {
            info {
                pages
            }
        }
    }
`;