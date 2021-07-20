import { gql } from "@apollo/client";

const LOCATION_FIELDS_PARTIAL = gql`
    fragment LocationFieldsPartial on Location {
        id
        name
        type
        dimension
    }
`;

export const GET_LOCATIONS = gql`
    query GetLocations($page: Int) {
        locations(page: $page) {
            results {
                ...LocationFieldsPartial
            }
        }
    }
    ${LOCATION_FIELDS_PARTIAL}
`;

export const GET_LOCATION = gql`
    query GetLocation($id: ID!) {
        location(id: $id) {
            ...LocationFieldsPartial
            residents {
                id
                name
                status
                species
                gender
                image
            }
        }
    }
    ${LOCATION_FIELDS_PARTIAL}
`;

export const GET_NUM_LOCATION_PAGES = gql`
    query GetNumLocationPages {
        locations(page: 1) {
            info {
                pages
            }
        }
    }
`;