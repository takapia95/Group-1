import {useStore} from "../resources/store";
import {useNavigate} from "react-router-dom";

const Search = () => {
    const navigate = useNavigate(); // useNavigation hook - to navigate to different pages
    const username = useStore((state) => state.username); // get the user from the store

    const handleSearch = (searchQuery) => {
        // added trim because it was possible to search with just spaces, which caused errors...
        if (searchQuery.trim() === '') {
            alert('Please enter a search query');
            return;
        }
        // navigate to the search results page with the search query
        navigate('/results?searchQuery=' + encodeURIComponent(searchQuery));
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