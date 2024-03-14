import {useNavigate} from "react-router-dom";
import {useStore} from "../resources/store";

const Table = ({entries}) => {
    const navigate = useNavigate();
    const deleteJournalEntry = useStore((state) => state.deleteJournalEntry);

    const handleDelete = (id) => {
        console.log('Delete button clicked', id)
        deleteJournalEntry(id);
    }

    const handleEdit = (id) => {
        console.log('Edit button clicked', id)
    }

    return (
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
                        onClick={() => navigate("/add-entry")}
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
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Date
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Title
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Location
                                    </th>
                                    <th scope="col"
                                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Description
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {entries.map((entry) => (
                                    <tr key={entry._id}>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.date}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.title}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.location}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{entry.description}</td>
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
    )
}

export default Table;