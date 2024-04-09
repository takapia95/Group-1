import {useStore} from "../resources/store";
import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import Loading from "./Loading";

const filters = [
    {
        name: 'Hotels',
    },
    {
        name: 'Restaurants',
    },
    {
        name: 'Attractions',
    },
    {
        name: 'Geos',
    }
]

const SearchResults = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('searchQuery');
    const category = searchParams.get('category');
    const navigate = useNavigate();

    const handleFilter = (category) => {
        searchParams.set('category', category);
        navigate(`/results?${searchParams.toString()}`);
    };

    const handleLocation = (location) => {
        sessionStorage.setItem('currentLocationInfo', JSON.stringify(location));
        navigate(`/location/${location.location_id}`);
    };

    useEffect(() => {
        setIsLoading(true);
        const getSearchResults = async () => {
            try {
                const response = await useStore.getState().search(searchQuery, category);
                setSearchResults(response);
                console.log('Search results:', searchResults);
                console.log('category:', category);
            } catch (error) {
                console.error('Failed to get search results:', error);
            } finally {
                setIsLoading(false);
            }
        };
        getSearchResults();
    } , [searchQuery, category]);

    return (
        <div className="px-6 py-12 sm:py-14 lg:px-8">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 text-center max-w-2xl pb-8 mx-auto sm:text-5xl">Search Results</h1>
            <div className="flex justify-center gap-4 flex-wrap">
                {filters.map((filter) => (
                    <button
                        onClick={() => handleFilter(filter.name.toLowerCase())}
                        key={filter.name}
                        className="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">
                        {filter.name}
                    </button>
                ))}
            </div>
            {isLoading && <Loading/>}
            {searchResults.length > 0 ? (
                <div className="flex flex-wrap gap-3.5 justify-center py-8">
                    {searchResults.map((result, index) => (
                        <div key={result?.location_id ?? index}
                             className="bg-amber-100 p-10 hover:scale-110 text-gray-800 max-w-lg transition ease-in-out hover:cursor-pointer rounded-md">
                            <button onClick={() => handleLocation(result)}>
                                <h4 className="text-xl font-bold tracking-tight border-b border-amber-500 mb-3">{result.name}</h4>
                                <p className="max-w-52 tracking-tight">{result.address_obj?.address_string ?? 'No address available'}</p>
                            </button>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center my-28 space-y-2">
                    <h2 className="text-3xl font-bold text-gray-900">No results found</h2>
                    <p className="text-gray-600">Try searching for something else...</p>
                    <button onClick={() => navigate(-1)}
                            className="text-sm font-semibold leading-6 text-amber-500 ease-linear transition hover:-translate-x-2">
                        <span aria-hidden="true">&larr;</span>
                        Go Back
                    </button>
                </div>
            )}
        </div>
    );
};
export default SearchResults;