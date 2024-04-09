import { create } from 'zustand';
import axios from "axios";

// Function to debounce another function
// It returns a new function that, when called, will delay execution of the original function
// until after wait milliseconds have elapsed since the last time it was called.
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handling session expiration with a debounced alert and redirect
const handleSessionExpired = debounce(() => {
    alert('Your session has expired. Please log in again.'); // Notify user
    window.location = '/'; // Redirect to login
}, 100); // Debounce time of 100ms, will only execute once every 100ms

// Handling 404
const handle404 = debounce(() => {
    window.location = '/404'; // Redirect to 404
}, 100);

const apiClient = axios.create({
    baseURL: 'http://localhost:3001'
});

// Response interceptor to handle expired tokens with debounced redirection
apiClient.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 403) {
        // If we have a 403 response, handle it here
        useStore.setState({
            loggedIn: false,
            username: null,
            authToken: null,
            journalEntries: [],
            searchResults: [],
            currentLocationInfo: null
        });
        sessionStorage.clear(); // Clear session storage

        handleSessionExpired(); // Debounced alert and redirect

        return Promise.reject(error);
    }

    // If the error is 404
    if (error.response && error.response.status === 404) {
        console.error('404 Error:', error.response.data);

        handle404();

        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export const useStore = create((set) => ({
    loggedIn: !!sessionStorage.getItem('authToken'),
    username: JSON.parse(sessionStorage.getItem('username')) || null,
    authToken: sessionStorage.getItem('authToken') || null,
    //searchResults: sessionStorage.getItem('searchResults') ? JSON.parse(sessionStorage.getItem('searchResults')) : [],
    currentLocationInfo: sessionStorage.getItem('currentLocationInfo') ? JSON.parse(sessionStorage.getItem('currentLocationInfo')) : null,
    modalContent: null,
    journalEntries: sessionStorage.getItem('journalEntries') ? JSON.parse(sessionStorage.getItem('journalEntries')) : [],
    formState: sessionStorage.getItem('formState') ? JSON.parse(sessionStorage.getItem('formState')) : {},



    // Login
    login: async (username, password) => {
        try {
            const response = await apiClient.post('http://localhost:3001/login', { username, password });
            if (response.data.message === 'Login successful') {
                set({
                    authToken: response.data.token,
                    username: response.data.username,
                    loggedIn: true,
                });

                // store the auth token in session storage
                sessionStorage.setItem('username', JSON.stringify(response.data.username));
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('journalEntries', JSON.stringify(response.data.journals));

                console.log(`Login successful! Name: ${response.data.username}, authToken: ${response.data.token}, journals: ${JSON.stringify(response.data.journals)}`);
                console.log(`Response data:`, response.data);
            }
        } catch (error) {
            let errMsg = 'Login failed, please try again.'; // default error message
            if (error?.response.data) {
                errMsg = error.response.data.message || errMsg;
            }
            throw new Error(errMsg);
        }
    },

    logout: () => {
        set({ user: null, loggedIn: false, authToken: null, journalEntries: [], searchResults: [], currentLocationInfo: null });
        sessionStorage.clear();
    },

    // Register
    register: async (username, password) => {
        try {
            const response = await apiClient.post('http://localhost:3001/register', { username, password });
            console.log('Registration successful:', response.data);
            alert('Registration successful');

            // After successful registration, switch to the login form
            set({ modalContent: 'login' }); // Update modalContent to 'login'
        } catch (error) {
            let errMsg = 'Register failed, please try again.'; // default error message
            if (error?.response.data) {
                errMsg = error.response.data.message || errMsg;
            }
            throw new Error(errMsg);
        }
    },


    search: async (searchQuery, category = '') => {
        // get the auth token from the store
        const authToken = useStore.getState().authToken;

        if (searchQuery === '') {
            return;
        }

        try {
            let url = `http://localhost:3001/search?searchQuery=${encodeURIComponent(searchQuery)}`;
            if (category) {
                url += `&category=${encodeURIComponent(category)}`;
            }

            console.log('Search URL:', url);

            const response = await apiClient.get(url,{
                // include the auth token in the request headers
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Search successful:', response.data );
            set({ searchResults: response.data.data });

            // store in session storage
            //sessionStorage.setItem('searchResults', JSON.stringify(response.data.data));

            return response.data.data; // return the search results instead of setting it in the store
        } catch (error) {
            console.error('Search failed:', error);
            throw new Error(error);
        }
    },

    setModalContent(content) {
        set({ modalContent: content });
    },
    getJournalEntries: async () => {
        const token = useStore.getState().authToken;
        try {
            const response = await apiClient.get('http://localhost:3001/journals', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Journal Entries:', response.data);
            set({ journalEntries: response.data });

            // store in session storage
            sessionStorage.setItem('journalEntries', JSON.stringify(response.data));
        } catch (error) {
            console.error('Failed to get journal entries:', error);
        }
    },

    addJournalEntry: async (locationId, locationName, title, text, isPublic, coverPhoto) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.post('http://localhost:3001/journals', { locationId, locationName, title, text, isPublic, coverPhoto }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            console.log('Added journal entry:', response.data);

            // update the journal entries in the store
            await useStore.getState().getJournalEntries();
        } catch (error) {
            console.error('Failed to add journal entry:', error);
        }
    },

    // delete journal entry
    deleteJournalEntry: async(id) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.delete(`http://localhost:3001/journals/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Deleted journal entry:', response.data);

            // update the journal entries in the store
            await useStore.getState().getJournalEntries();
        } catch (error) {
            console.error('Failed to delete journal entry:', error);
        }
    },

    getJournalEntryById: async (id) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.get(`http://localhost:3001/journals/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Journal entry:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to get journal entry:', error);
        }
    },

    editJournalEntry: async (id, title, text, isPublic, coverPhoto) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.put(`http://localhost:3001/journals/${id}`, { title, text, isPublic, coverPhoto }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Edited journal entry:', response.data);

            // update the journal entries in the store
            await useStore.getState().getJournalEntries();
        } catch (error) {
            console.error('Failed to edit journal entry:', error);
        }
    },

    getJournalEntriesByLocation: async (locationId) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.get(`http://localhost:3001/journals/location/${locationId}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Journal entries by location:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to get journal entries by location:', error);
        }
    },

}));
