import {useStore} from "../resources/store";
import logo from "./media/logo.png";


export default function Header() {
    const login = useStore((state) => state.login);
    const logout = useStore((state) => state.logout);
    const loggedIn = useStore((state) => state.loggedIn);

    return (
        <header className="items-center shadow-md">
            <nav className="mx-auto flex items-center justify-evenly p-3 lg:px-8" aria-label="Global">
                <div className="flex flex-1">
                    <a href="/#" className="flex flex-row-reverse gap-1 items-center">
                        <span className="">Voyage</span>
                        <img className="h-8 w-auto"
                            src= {logo} alt=""/>

                    </a>
                </div>
                <div>
                    {loggedIn ? (
                        <button onClick={logout} className="bg-amber-500 text-white px-6 py-1 rounded-md shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">View Journals</button>
                    ) : (
                        <button onClick={() => login('maria')} className="bg-amber-500 text-white px-6 py-1 rounded-md shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">Login</button>
                    )}
                </div>
            </nav>
        </header>
    );
}