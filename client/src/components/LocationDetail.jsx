import {useStore} from "../resources/store";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

const LocationDetail = () => {
    const { locationId } = useParams();
    const navigate = useNavigate();
    const location = useStore((state) => state.currentLocationInfo);

    useEffect(() => {
        // get the location info from session storage
        const storedLocationInfo = JSON.parse(sessionStorage.getItem('currentLocationInfo'));
        if (storedLocationInfo) {
            useStore.setState({ currentLocationInfo: storedLocationInfo });
        }

        // if locationId is not the same as the current location
        if (locationId !== location?.location_id) {
            // TODO: throw error or redirect to 404
            console.error('location ID mismatch!!! help!!');
        }
    }, [locationId]);

    return (
        <div>
            <h1>Location</h1>
            <h2>ID: {location?.location_id}</h2>
            <p>NAME: {location?.name}</p>
            <p>ADDRESS: {location?.address_obj.address_string}</p>
            <button onClick={() => navigate(`/add-entry/${location?.name}/${locationId}`)}
                    className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                Add Journal Entry
            </button>
        </div>
    );
};

export default LocationDetail;