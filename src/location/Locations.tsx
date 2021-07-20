import { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import client from "../client";
import { GET_LOCATIONS, GET_NUM_LOCATION_PAGES } from "./query";
import { LocationPartial } from "../types";
import ErrorComponent from "../Common/ErrorComponent";
import { useQuery } from "@apollo/client";

import "../styles/Locations.scss";

function getLocationPage(
    page: number,
    setEpisodes: React.Dispatch<React.SetStateAction<LocationPartial[]> >,
    setNextPage: React.Dispatch<React.SetStateAction<number> >,
    setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined> >,
    setLoading: React.Dispatch<React.SetStateAction<boolean> >
) {
    setLoading(true);
    client.query({
        query: GET_LOCATIONS,
        fetchPolicy: "cache-first",
        variables: {
            page: page
        }
    })
    .then(result => {
        const data = result.data.locations.results as LocationPartial[];
        setEpisodes((prevLocations) => [...prevLocations, ...data]);
        setLoading(false);
    })
    .catch(error => setErrorMessage(error.message));

    setNextPage(page => page + 1);
}

function Episodes() {

    const history = useHistory();
    const numPagesQuery = useQuery(GET_NUM_LOCATION_PAGES);
    const [locations, setLocations] = useState<LocationPartial[]>([]);
    const [nextPage, setNextPage] = useState(1);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLocationPage(
            1, setLocations, setNextPage, setErrorMessage, setLoading
        );
    }, []);

    const scrollHandler = useCallback((event: React.UIEvent<HTMLElement, UIEvent>) => {
        const scrollTop = event.currentTarget.scrollTop;
        const scrollHeight = event.currentTarget.scrollHeight;
        const scrollFraction = scrollTop / scrollHeight;

        if(!numPagesQuery.loading && scrollFraction > 0.3 && !loading
            && (numPagesQuery.data.locations.info.pages as number) >= nextPage) {

            getLocationPage(
                nextPage, setLocations, setNextPage, setErrorMessage, setLoading
            );
        }
    }, [numPagesQuery, loading, locations, nextPage]);

    let error = undefined;
    if(numPagesQuery.error) error = numPagesQuery.error.message;
    else if(errorMessage) error = errorMessage;

    if(error) return <ErrorComponent message={error} />;

    return (
        <div className="episodes" onScroll={scrollHandler}>
            <table className="episode-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Dimension</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map(location => 
                        <tr key={location.id}
                            onClick={() => history.push(`/locations/${location.id}`)}>
                            <td>{location.name}</td>
                            <td>{location.dimension}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Episodes;