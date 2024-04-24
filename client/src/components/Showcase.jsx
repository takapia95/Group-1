import viewJournalPhoto from '../images/views.png';
import locationPhoto from '../images/location.png';

export default function Showcase() {
    return (
        <>
            <div className="overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">Photos
                                and locations
                                </h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Pick the location you've travelled to or want to travel to. Been there? Write about it and pick a photo to match!
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start justify-end lg:order-first">
                            <img
                                src={viewJournalPhoto}
                                alt="Product screenshot"
                                className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
                                width={2432}
                                height={1442}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden bg-amber-50 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4x text-center">Share your Voyage!</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Want your experience to be seen by others? Or maybe you want to keep your special moment to yourself. Either option is possible with Voyage!
                                </p>
                            </div>
                        </div>
                        <img
                            src={locationPhoto}
                            alt="Product screenshot"
                            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            width={2432}
                            height={1442}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}