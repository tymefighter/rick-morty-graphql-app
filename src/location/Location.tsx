import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import CharacterList from "../Common/CharacterList";
import ErrorComponent from "../Common/ErrorComponent";
import LoadingComponent from "../Common/LoadingComponent";
import { Location as LocationType } from "../types";
import { GET_LOCATION } from "./query";

interface ParamsType {
    locationId: string;
};

function Location() {

    const { locationId } = useParams<ParamsType>();
    const {data, loading, error} = useQuery(GET_LOCATION, {
        variables: {
            id: locationId
        }
    });

    if(loading) return <LoadingComponent />;

    if(error) return <ErrorComponent message={error.message} />;

    const location = data.location as LocationType;

    return (
        <div className="location">
            <div className="location__main-info">
                <h1 className="location__main-info-heading">{location.name}</h1>
                <p className="location__main-info-para">Dimension: {location.dimension}</p>
            </div>
            <div className="location__info">
                <h2 className="location__info-heading">Residents</h2>
                <CharacterList characterList={location.residents} />
            </div>
        </div>
    );
}

export default Location;