import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './components/Home';
import SearchResults from "./components/SearchResults";
import UserProfile from "./components/UserProfile";
import AddEntry from "./components/AddEntry";
import EditEntry from "./components/EditEntry";
import LocationDetail from "./components/LocationDetail";
import Error from "./components/Error";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true, element: <> <Home /> </>
            },
            {
                path: "/results", element: <SearchResults />
            },
            {
                path: "/profile", element: < UserProfile />
            },
            {
                path: "/add-entry/:locationName/:locationId", element: <AddEntry />
            },
            {
                path: "/edit-entry/:entryId", element: <EditEntry />
            },
            {
                path: "/location/:locationId", element: <LocationDetail />
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
