import logo from "../images/logo.png";

export default function Error() {
    return (
        <div className="bg-white">
            <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8">
                <img
                    className="mx-auto h-10 w-auto sm:h-12"
                    src={logo}
                    alt="Voyage"
                />
                <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
                    <p className="text-base font-semibold leading-8 text-amber-500">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">This page does not exist</h1>
                    <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-6 sm:text-lg sm:leading-8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                </div>
                <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
                    <div className="mt-0.5 flex justify-center">
                        <a href="/#" className="text-sm font-semibold leading-6 text-amber-500 ease-linear transition hover:-translate-x-2">
                            <span aria-hidden="true">&larr;</span>
                            Back to home
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}