import { create } from 'zustand';
import axios from "axios";

export const useStore = create((set) => ({
    loggedIn: !!sessionStorage.getItem('authToken'),
    username: JSON.parse(sessionStorage.getItem('username')) || null,
    authToken: sessionStorage.getItem('authToken') || null,
    searchResults: sessionStorage.getItem('searchResults') ? JSON.parse(sessionStorage.getItem('searchResults')) : [],
    modalContent: null,
    journalEntries: sessionStorage.getItem('journalEntries') ? JSON.parse(sessionStorage.getItem('journalEntries')) : [],

    // Login
    login: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.data.message === 'Login successful') {
                set({
                    authToken: response.data.token,
                    username: response.data.username,
                    loggedIn: true,
                });

                // store the auth token in session storage
                sessionStorage.setItem('username', JSON.stringify(response.data.username));
                sessionStorage.setItem('authToken', response.data.token);

                console.log(`Login successful! Name: ${response.data.username}, loggedIn: ${response.data.loggedIn}, authToken: ${response.data.token}`);
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
        set({ user: null, loggedIn: false, authToken: null, journalEntries: [] });
        sessionStorage.clear();
    },

    // Register
    register: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/register', { username, password });
            console.log('Registration successful:', response.data);
            alert('Registration successful');
        } catch (error) {
            let errMsg = 'Register failed, please try again.'; // default error message
            if (error?.response.data) {
                errMsg = error.response.data.message || errMsg;
            }
            throw new Error(errMsg);
        }
    },

    search: async (searchQuery) => {
        // get the auth token from the store
        const authToken = useStore.getState().authToken;

        if (searchQuery === '') {
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3001/search?searchQuery=${searchQuery}`,{
                // include the auth token in the request headers
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });

            console.log('Search successful:', response.data );
            set({ searchResults: response.data.data });

            // store in session storage
            sessionStorage.setItem('searchResults', JSON.stringify(response.data.data));
        } catch (error) {
            console.error('Search failed:', error);
            throw new Error(error);
        }
    },

    setModalContent(content) {
        set({ modalContent: content });
        //console.log('Modal content:', content); // debugging
    },
    getJournalEntries: async () => {
        const token = useStore.getState().authToken;
        try {
            const response = await axios.get('http://localhost:3001/journals', {
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

    addJournalEntry: async (title, text) => {
        const authToken = useStore.getState().authToken;
        try {
            const response = await axios.post('http://localhost:3001/journals', { title, text }, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            });
            console.log('Added journal entry:', response.data);

            // update the journal entries in the store
            useStore.getState().getJournalEntries();
        } catch (error) {
            console.error('Failed to add journal entry:', error);
        }
    }
}));