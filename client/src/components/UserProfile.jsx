import {useStore} from "../resources/store";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Table from "./Table";

const UserProfile = () => {
    const navigate = useNavigate();
    const username = useStore((state) => state.username);
    const loggedIn = useStore((state) => state.loggedIn);
    const entries = useStore((state) => state.journalEntries);

    useEffect(() => {
        if (!loggedIn) {
            navigate('/');
        }
    }, [loggedIn, navigate]);

    return (
        <div className="pt-10 min-h-screen">
            <h2 className="text-4xl font-bold text-gray-900 text-center mx-auto pb-0.5 border-b border-amber-200 w-1/2 sm:w-1/4">{username ? username + "'s" : "Your"} Voyages</h2>
            <div>
                {entries && entries.length > 0 ? (
                <Table entries={entries} />
                ) : (
                    <div className="text-center py-28 space-y-5">
                        <p className="text-2xl text-gray-600">No entries yet!</p>
                        {console.log("entries", entries)}
                        <button onClick={() => navigate("/add-entry")} className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">Start Journaling</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserProfile;