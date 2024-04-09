import { useStore } from '../resources/store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import travelPhoto1 from '../images/cover-photos/travel-1.jpg';
import travelPhoto2 from '../images/cover-photos/travel-2.jpg';
import travelPhoto3 from '../images/cover-photos/travel-3.jpg';
import travelPhoto4 from '../images/cover-photos/travel-4.jpg';

const photos = [
    { id: 'travelPhoto1', src: travelPhoto1 },
    { id: 'travelPhoto2', src: travelPhoto2 },
    { id: 'travelPhoto3', src: travelPhoto3 },
    { id: 'travelPhoto4', src: travelPhoto4 },
];

const Form = ({ mode }) => {
    const [formError, setFormError] = useState('');
    const [selectedPhoto, setSelectedPhoto] = useState(photos[0].id);
    const navigate = useNavigate();
    const { entryId, locationId, locationName } = useParams();
    const { getJournalEntryById, addJournalEntry, editJournalEntry } = useStore((state) => ({
        getJournalEntryById: state.getJournalEntryById,
        addJournalEntry: state.addJournalEntry,
        editJournalEntry: state.editJournalEntry,
    }));

    useEffect(() => {
        const fetchData = async () => {
            if (mode === 'add') {
                if (!locationId || !locationName) {
                    setFormError('No location ID or name provided!');
                    console.log(formError);
                    navigate('/404');
                }
            }

            if (mode === 'edit') {
                if (!entryId) {
                    console.error('No journal ID provided!');
                    setFormError('No journal ID provided!');
                    navigate('/404');
                }

                try {
                    const formState = JSON.parse(sessionStorage.getItem('formState'));
                    if (formState && formState.id === entryId) {
                        populateFormFields(formState);
                    } else {
                        const fetchedEntry = await getJournalEntryById(entryId);
                        populateFormFields(fetchedEntry);
                    }
                } catch (error) {
                    setFormError(error.message);
                    console.log(formError);
                }
            }
        };

        const saveFormState = () => {
            const formState = {
                id: entryId,
                title: document.getElementById('title').value,
                about: document.getElementById('about').value,
                isPublic: document.querySelector('input[name="visibility"]').checked,
                coverPhoto: selectedPhoto,
            };
            sessionStorage.setItem('formState', JSON.stringify(formState));
        };

        document.getElementById('form').addEventListener('input', saveFormState);

        fetchData();

    }, [mode, entryId, locationId, locationName, getJournalEntryById]);

    const populateFormFields = (data) => {
        document.getElementById('title').value = data.title;
        document.getElementById('about').value = data.text || data.about;
        document.getElementById(data.isPublic ? 'yes' : 'no').checked = true;
        setSelectedPhoto(data.coverPhoto);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const text = document.getElementById('about').value;
        const isPublic = document.getElementById('yes').checked;
        const coverPhoto = selectedPhoto;

        try {
            if (mode === 'edit') {
                await editJournalEntry(entryId, title, text, isPublic, coverPhoto);
            } else {
                await addJournalEntry(locationId, locationName, title, text, isPublic, coverPhoto);
            }

            resetForm();
            navigate('/profile');
        } catch (error) {
            setFormError(error.message);
            console.log(error);
        }
    };

    const handleCancel = () => {
        resetForm();
        navigate('/profile');
        sessionStorage.removeItem('formState');
    };

    const resetForm = () => {
        document.getElementById('form').reset();
    };


    return (
        <form onSubmit={handleSubmit} id="form" data-testid="form">
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
                            <p className="mt-3 text-sm leading-6 text-gray-600">What do you want to remember about this
                                trip? Do you want to come back?</p>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                Cover photo
                            </label>
                            <div className="mt-2 flex flex-wrap justify-center gap-4">
                                {photos.map(photo => (
                                    <button
                                        key={photo.id}
                                        type="button"
                                        className={`rounded-lg overflow-hidden border-2 ${selectedPhoto === photo.id ? 'border-amber-500' : 'border-transparent'}`}
                                        onClick={() => setSelectedPhoto(photo.id)}
                                    >
                                        <img src={photo.src} alt={`Travel Photo`} className="h-32 w-32 object-cover"/>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-1.5 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Share it</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Would you like to make this entry
                                public?</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="yes"
                                        name="visibility"
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
                                        name="visibility"
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
                <button type="button" onClick={() => handleCancel()} className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    data-testid="submit"
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