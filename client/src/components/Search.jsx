import {useStore} from "../resources/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const navigate = useNavigate(); // useNavigation hook - to navigate to different pages
    const username = useStore((state) => state.username); // get the user from the store
    const search = useStore((state) => state.search);
    const searchResults = useStore((state) => state.searchResults);

    useEffect(() => {
        // because it kept logging empty arrays on refresh, which was annoying
        if (searchResults.length > 0) {
            console.log("searchResults", searchResults); //debug TODO: remove
        }

    }, [searchResults]); // when searchResults changes... do something

    const handleSearch = (searchQuery) => {
        // added trim because it was possible to search with just spaces, which caused errors...
        if (searchQuery.trim() === '') {
            alert('Please enter a search query');
            return;
        }
        search(searchQuery).then(() => {
            navigate('/results');
        });
    }

    return (
        <div className="relative isolate overflow-hidden bg-amber-50">
            <div className="text-center py-12 md:py-40">
                <p className="text-amber-500 text-xl">Hi, {username || "there"}!</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    Where have you been?
                </h2>
                <div className="flex justify-center mt-6">
                    <input
                        type="text"
                        className="w-3/4 md:w-1/2 lg:w-1/3 px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Places to go, things to do..."
                        id="search"
                        maxLength={50}
                        required
                    />
                    <button onClick={() => handleSearch(document.getElementById('search').value)}
                            className="ml-2 px-4 py-2 text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Search;