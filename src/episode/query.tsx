import { gql } from "@apollo/client";

export const GET_EPISODES = gql`
    query GetEpisodes($page: Int) {
        episodes(page: $page) {
            results {
                id
                name
                air_date
                episode
            }
        }
    }
`;  

export const GET_EPISODE = gql`
    query GetEpisode($id: ID) {
        episode(id: $id) {
            id
            name
            air_date
            episode
            characters
        }
    }
`;