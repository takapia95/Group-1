import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "../resources/store";
import Loading from "./Loading";

const LocationDetail = () => {
    const [loading, setLoading] = useState(true);
    const [randomEntry, setRandomEntry] = useState(null);
    const [locationPhoto, setLocationPhoto] = useState(null);
    const { locationId } = useParams();
    const navigate = useNavigate();
    const location = useStore((state) => state.currentLocationInfo);
    const getJournalEntriesByLocation = useStore((state) => state.getJournalEntriesByLocation);
    const getLocationPhoto = useStore((state) => state.getLocationPhoto);

    useEffect(() => {
        const fetchLocationInfo = async () => {
            setLoading(true);
            try {
                const storedLocationInfo = JSON.parse(sessionStorage.getItem('currentLocationInfo'));
                // If location info is in session storage, update the store with it
                if (storedLocationInfo) {
                    useStore.setState({ currentLocationInfo: storedLocationInfo });
                    // get location photo
                    const photoData = await getLocationPhoto(storedLocationInfo.location_id);
                    setLocationPhoto(photoData.data[0].images.large.url);
                } else {
                    console.error('No location info found');
                    navigate('/404'); // Redirect to a 404 page if no location info is found
                }
            } catch (error) {
                console.error('Failed to fetch location info', error);
                navigate('/404');
            } finally {
                setLoading(false);
            }
        };

        // fetch random entry from location
        const fetchRandomEntry = async () => {
            // Fetch random entry from location
            console.log('Fetching random entry from location:', locationId);
            try {
                const response = await getJournalEntriesByLocation(locationId);
                setRandomEntry(response[Math.floor(Math.random() * response.length)]);
                console.log('Random entry:', response);
            } catch (error) {
                console.error('Failed to fetch random entry:', error);
            }
        };

        fetchLocationInfo();
        fetchRandomEntry();
    }, [locationId, navigate, locationPhoto, getJournalEntriesByLocation, getLocationPhoto]);

    useEffect(() => {
        if (!loading && locationId !== location?.location_id) {
            console.error('Location ID mismatch!!! Redirecting...');
            navigate('/404'); // Redirect to a 404 page if IDs don't match
        }
    }, [location, locationId, loading, navigate]); // Re-check when loading status or location changes

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="container text-center mx-auto space-y-3 my-20 flex justify-center items-center flex-col">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Wow! You've been to...</h2>
            <p className="mt-6 text-xl leading-8 text-gray-700 font-bold">{location?.name}</p>
            <p className="mt-6 text-lg leading-8 text-gray-700 font-semibold">{location?.address_obj.address_string}</p>
            {/* TODO: maybe add a better placeholder image? */}
            <img src={locationPhoto || 'https://via.placeholder.com/500'} className="rounded" alt={location?.name} />
            <p>Want to write about your experience?</p>
            <button onClick={() => navigate(`/add-entry/${location?.name}/${locationId}`)}
                    className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                Add Journal Entry
            </button>

            <div className="pt-10 space-y-5">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Random Entry from this location</h3>
                <div className="bg-amber-100 p-10 text-gray-800 max-w-lg rounded-md">
                    {randomEntry ? (
                        <>
                            <h4 className="text-xl font-bold tracking-tight border-b border-amber-500 mb-3">{randomEntry.title}</h4>
                            <p className="tracking-tight">{randomEntry.text}</p>
                        </>
                    ) : (
                        <p>Currently, there are no public entries for this location.</p>
                    )}
                </div>
            </div>

            {/*WOW, i had NO IDEA ABOUT THAT -1!!! HOW NICE!!! wow.*/}
            <button onClick={() => navigate(-1)}
                    className="text-sm font-semibold leading-6 text-amber-500 ease-linear transition hover:-translate-x-2">
                <span aria-hidden="true">&larr;</span>
                Go Back
            </button>
        </div>
    );
};

export default LocationDetail;