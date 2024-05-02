import { create } from 'zustand';
import axios from "axios";

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

const handleSessionExpired = debounce(() => {
    alert('Your session has expired. Please log in again.'); 
    window.location = '/'; 
}, 100); 

const handle404 = debounce(() => {
    window.location = '/404'; 
}, 100);

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_BASE_URL
});

apiClient.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 403) {
        useStore.setState({
            loggedIn: false,
            username: null,
            authToken: null,
            journalEntries: [],
            searchResults: [],
            currentLocationInfo: null
        });
        sessionStorage.clear(); 

        handleSessionExpired(); 

        return Promise.reject(error);
    }

    if (error.response && error.response.status === 404) {
        console.error('404 Error:', error.response.data);

        console.log(`BASE URL: ${process.env.REACT_APP_SERVER_BASE_URL}`)

        return Promise.reject(error);
    }
    return Promise.reject(error);
});

export const useStore = create((set) => ({
    loggedIn: !!sessionStorage.getItem('authToken'),
    username: JSON.parse(sessionStorage.getItem('username')) || null,
    authToken: sessionStorage.getItem('authToken') || null,
    currentLocationInfo: sessionStorage.getItem('currentLocationInfo') ? JSON.parse(sessionStorage.getItem('currentLocationInfo')) : null,
    modalContent: null,
    journalEntries: sessionStorage.getItem('journalEntries') ? JSON.parse(sessionStorage.getItem('journalEntries')) : [],
    formState: sessionStorage.getItem('formState') ? JSON.parse(sessionStorage.getItem('formState')) : {},



    login: async (username, password) => {
        try {
            const response = await apiClient.post(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, { username, password });
            if (response.data.message === 'Login successful') {
                set({
                    authToken: response.data.token,
                    username: response.data.username,
                    loggedIn: true,
                });

                sessionStorage.setItem('username', JSON.stringify(response.data.username));
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('journalEntries', JSON.stringify(response.data.journals));

                console.log(`Login successful! Name: ${response.data.username}, authToken: ${response.data.token}, journals: ${JSON.stringify(response.data.journals)}`);
                console.log(`Response data:`, response.data);
            }
        } catch (error) {
            let errMsg = 'Login failed, please try again.'; 
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

    register: async (username, password) => {
        try {
            const response = await apiClient.post(`${process.env.REACT_APP_SERVER_BASE_URL}/register`, { username, password });
            console.log('Registration successful:', response.data);
            alert('Registration successful');

            set({ modalContent: 'login' }); 
        } catch (error) {
            let errMsg = 'Register failed, please try again.'; 
            if (error?.response.data) {
                errMsg = error.response.data.message || errMsg;
            }
            throw new Error(errMsg);
        }
    },


    search: async (searchQuery, category = '') => {
        const authToken = useStore.getState().authToken;

        if (searchQuery === '') {
            return;
        }

        try {
            let url = `${process.env.REACT_APP_SERVER_BASE_URL}/search?searchQuery=${encodeURIComponent(searchQuery)}`;
            if (category) {
                url += `&category=${encodeURIComponent(category)}`;
            }

            console.log('Search URL:', url);

            const response = await apiClient.get(url,{
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Search successful:', response.data );
            set({ searchResults: response.data.data });

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
            const response = await apiClient.get(`${process.env.REACT_APP_SERVER_BASE_URL}/journals`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Journal Entries:', response.data);
            set({ journalEntries: response.data });

            sessionStorage.setItem('journalEntries', JSON.stringify(response.data));
        } catch (error) {
            console.error('Failed to get journal entries:', error);
        }
    },

    addJournalEntry: async (locationId, locationName, title, text, isPublic, coverPhoto) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.post(`${process.env.REACT_APP_SERVER_BASE_URL}/journals`, { locationId, locationName, title, text, isPublic, coverPhoto }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            console.log('Added journal entry:', response.data);

            await useStore.getState().getJournalEntries();
        } catch (error) {
            console.error('Failed to add journal entry:', error);
        }
    },

    deleteJournalEntry: async(id) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.delete(`${process.env.REACT_APP_SERVER_BASE_URL}/journals/${id}`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Deleted journal entry:', response.data);

            await useStore.getState().getJournalEntries();
        } catch (error) {
            console.error('Failed to delete journal entry:', error);
        }
    },

    getJournalEntryById: async (id) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.get(`${process.env.REACT_APP_SERVER_BASE_URL}/journals/${id}`, {
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
            const response = await apiClient.put(`${process.env.REACT_APP_SERVER_BASE_URL}/journals/${id}`, { title, text, isPublic, coverPhoto }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Edited journal entry:', response.data);

            await useStore.getState().getJournalEntries();
        } catch (error) {
            console.error('Failed to edit journal entry:', error);
        }
    },

    getJournalEntriesByLocation: async (locationId) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await apiClient.get(`${process.env.REACT_APP_SERVER_BASE_URL}/journals/location/${locationId}`, {
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

    getLocationPhoto: async (locationId) => {
        const authToken = useStore.getState().authToken;

        try {
            const response = await apiClient.get(`${process.env.REACT_APP_SERVER_BASE_URL}/locations/${locationId}/photos`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            console.log('Location photo:', response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to get location photo:', error);
        }
    }

}));
