import {useStore} from "../resources/store";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Modal from "./Modal";
import logo from "../images/logo.png";

export default function Header() {
    // local state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // zustand store
    const logout = useStore((state) => state.logout);
    const loggedIn = useStore((state) => state.loggedIn);

    // useLocation hook - to get the current location
    const location = useLocation();

    // Function to toggle modal visibility
    const toggleModal = () => setIsModalOpen(!isModalOpen);

    // if the current location is the 'profile' page...
    const isProfilePage = location.pathname === "/profile";

    // variable to show what buttons to display in the header depending on state
    let buttons;

    useEffect(() => {
        if (loggedIn) {
            setIsModalOpen(false);
        }
    }, [loggedIn]);


    // instead of having a nested ternary, i used if else statements, so...
    // if the user is logged in and the current location is the 'profile' page then..
    if (loggedIn) {
        if (isProfilePage) {
            buttons = (
                <>
                    <a href="/"
                       className="bg-amber-500 text-white px-6 py-1 rounded-md shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">Home</a>
                    <button onClick={() => logout()}
                            className="ml-0.5 sm:ml-4 bg-amber-500 text-white px-6 py-1 rounded-md shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">Logout
                    </button>
                </>
            );
        } else {
            buttons = (
                <a href="/profile" className="bg-amber-500 text-white px-6 py-1 rounded-md shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 no-underline">View Journals</a>
            );
        }
    } else {
        buttons = (
            <button onClick={toggleModal} className="bg-amber-500 text-white px-6 py-1 rounded-md shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">Login</button>
        );
    }

    return (
        <>
            <header className="items-center shadow-md">
                <nav className="mx-auto flex items-center justify-evenly p-3 lg:px-8" aria-label="Global">
                    <div className="flex flex-1">
                        <a href="/#" className="flex flex-row-reverse gap-1 items-center no-underline text-amber-500 font-semibold">
                            <span className="">Voyage</span>
                            <img className="h-8 w-auto" src={logo} alt="Voyage"/>
                        </a>
                    </div>
                    <div>
                        {buttons}
                    </div>
                </nav>
            </header>
            <Modal isOpen={isModalOpen} onClose={toggleModal}/>
        </>
    );
}