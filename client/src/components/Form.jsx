import { PhotoIcon } from '@heroicons/react/24/solid'
import {useStore} from "../resources/store";
import {useState} from "react";

const Form = () => {
    const [formError, setError] = useState('');
    const addJournalEntry = useStore((state) => state.addJournalEntry);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const text = document.getElementById('about').value;
        const isPublic = document.getElementById('yes').checked; // TODO: use this to set the visibility of the entry

        try {
            await addJournalEntry(title, text);
        } catch (error) {
            setError(error.message);
            console.log(error)
        }
    };

    return (
        <form onSubmit={handleSubmit} id="form">
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">New Journal Entry</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Remember your travels by writing about them here. We'll keep them safe for you.
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Title
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm sm:max-w-md px-1.5">
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        autoComplete="on"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ring-1 ring-inset ring-gray-300 rounded-md"
                                        placeholder="Title"
                                        maxLength={50}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                About
                            </label>
                            <div className="mt-2">
                <textarea
                    id="about"
                    name="about"
                    rows={15}
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    defaultValue={''}
                    placeholder="Write about your trip..."
                    maxLength={5000}
                    required
                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">What do you want to remember about this trip? Do you want to come back?</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer rounded-md bg-white font-semibold text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-500 focus-within:ring-offset-2 hover:text-amber-400"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-1.5 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Share it</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Would you like to make this entry public?</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="yes"
                                        name="accessible"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-500"
                                        defaultChecked
                                    />
                                    <label htmlFor="yes" className="block text-sm font-medium leading-6 text-gray-900">
                                        Yes, I want to share my experience.
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="no"
                                        name="accessible"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-amber-500 focus:ring-amber-500"
                                    />
                                    <label htmlFor="no" className="block text-sm font-medium leading-6 text-gray-900">
                                        No, I want to keep this to myself.
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default Form;