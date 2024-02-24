import {useStore} from "../resources/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const navigate = useNavigate(); // useNavigation hook - to navigate to different pages
    const user = useStore((state) => state.user);
    const search = useStore((state) => state.search);
    const searchResults = useStore((state) => state.searchResults);

    useEffect(() => {
        // because it kept logging empty arrays on refresh, which was annoying
        if (searchResults.length > 0) {
            console.log("searchResults", searchResults);
        }

    }, [searchResults]); // when searchResults changes... do something

    const handleSearch = (searchQuery) => {
        search(searchQuery).then(() => {
            navigate('/results'); // navigate to the results page
        });
    }

    return (
        <div className="relative isolate overflow-hidden bg-amber-50">
            <div className="text-center py-12 md:py-40">
                <p className="text-amber-500 text-xl">Hi, {user ? user.username : "there"}!</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    Where have you been?
                </h2>
                <div className="flex justify-center mt-6">
                    <input
                        type="text"
                        className="w-3/4 md:w-1/2 lg:w-1/3 px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Places to go, things to do..."
                        id="search"
                    />
                    <button onClick={() => handleSearch(document.getElementById('search').value)}
                            className="ml-2 px-4 py-2 text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
                        Search
                    </button>
                </div>
                {/* search results for POC  */}
                {searchResults.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold text-gray-900">Search Results:</h3>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                            {searchResults.map((result) => (
                                <div key={result.location_id} className="w-1/3 md:w-1/4 lg:w-1/6">
                                    <p className="mt-2 text-sm font-semibold text-gray-900">{result.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search;