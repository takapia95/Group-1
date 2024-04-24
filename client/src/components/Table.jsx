import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../resources/store';

// Define icons for the public and private states
const EyeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
  </svg>
);

const LockIcon = (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

);

const Table = ({ entries }) => {
    const navigate = useNavigate();
    const deleteJournalEntry = useStore((state) => state.deleteJournalEntry);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState(null);

    const handleDelete = (id) => {
        console.log('Delete button clicked', id)
        deleteJournalEntry(id);
    }

    const handleEdit = (id) => {
        console.log('Edit button clicked', id)
        navigate(`/edit-entry/${id}`);
    };

    const openDetails = (entry) => {
        setSelectedEntry(entry);
        setShowDetails(true);
    };

    const closeDetails = () => {
        setShowDetails(false);
    };

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Journal Entries</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            All your journal entries in one place. Where have you been?
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <button
                            onClick={() => navigate("/#")}
                            type="button"
                            className="block rounded-md bg-amber-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                        >
                            New Entry
                        </button>
                    </div>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Title</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Visibility</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {entries.map((entry) => (
                                            <tr key={entry._id} onClick={() => openDetails(entry)}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.date}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.location}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.title}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.text.slice(0, 15) + "..."}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {entry.isPublic ? <span>{EyeIcon}</span> : <span>{LockIcon}</span>}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <div className="space-x-2.5">
                                                        <button onClick={() => handleEdit(entry._id)} href="#" className="text-amber-500 hover:text-amber-600">
                                                            Edit<span className="sr-only">, {entry.name}</span>
                                                        </button>
                                                        <button onClick={() => handleDelete(entry._id)} href="#" className="text-white bg-amber-500 hover:bg-amber-400 p-1.5 rounded-md">
                                                            Delete<span className="sr-only">, {entry.name}</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedEntry && (
                <Offcanvas show={showDetails} onHide={closeDetails}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title> {selectedEntry.title}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <p>Date: {selectedEntry.date}</p>
                        <p>Location: {selectedEntry.location}</p>
                        <p>Description: {selectedEntry.text}</p>
                        {/* Add more details as needed */}
                    </Offcanvas.Body>
                </Offcanvas>
            )}
        </>
    );
};

export default Table;
