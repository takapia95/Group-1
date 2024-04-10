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
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


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
                path: "/add-entry", element: <AddEntry />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
