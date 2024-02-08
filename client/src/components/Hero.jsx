import {useStore} from "../resources/store"

const Hero = () => {
    const loggedIn = useStore((state) => state.loggedIn)
    const user = useStore((state) => state.user)

    return !loggedIn ? (
        <div className="relative isolate overflow-hidden bg-amber-50">
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
                    <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Begin your journey with <span className="text-amber-500">Voyage.</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
                        fugiat veniam occaecat fugiat aliqua.
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                        <a
                            href="/#"
                            className="rounded-md bg-amber-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                        >
                            Start your journey
                        </a>
                    </div>
                </div>
                <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                        <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                            {/*We'll replace this with a screenshot of how it looks when you want to create a journal entry.*/}
                            <img
                                src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                                alt="App screenshot"
                                width={2432}
                                height={1442}
                                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="relative isolate overflow-hidden bg-amber-50">
            <div className="text-center py-12 md:py-40">
                <p className="text-amber-500 text-xl">Hi, {user.name}</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    Where have you been?
                </h2>
                <div className="flex justify-center mt-6">
                    <input
                        type="text"
                        className="w-3/4 md:w-1/2 lg:w-1/3 px-4 py-2 text-gray-900 bg-white rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="Places to go, things to do..."
                    />
                    <button className="ml-2 px-4 py-2 text-white bg-amber-500 rounded-md shadow-md hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Hero;
