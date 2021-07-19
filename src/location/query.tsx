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
    query GetLocation($id: ID) {
        location(id: $id) {
            ...LocationFieldsPartial
            residents
        }
    }
    ${LOCATION_FIELDS_PARTIAL}
`;