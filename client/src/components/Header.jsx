export default function Header() {
    return (
        <header className="items-center shadow-md">
            <nav className="mx-auto flex items-center justify-evenly p-3 lg:px-8" aria-label="Global">
                <div className="flex flex-1">
                    <a href="/#" className="flex flex-row-reverse gap-1 items-center">
                        <span className="">Voyage</span>
                        <img className="h-8 w-auto"
                             src="https://tailwindui.com/img/logos/mark.svg?color=amber&shade=500" alt=""/>
                    </a>
                </div>
                <div>
                    <button className="bg-amber-500 text-white px-6 py-1 rounded-md shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500">Login</button>
                </div>
            </nav>
        </header>
    );
}