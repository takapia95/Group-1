import { create } from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    loggedIn: sessionStorage.getItem('authToken') || false,
    authToken: sessionStorage.getItem('authToken') || null,
    searchResults: [],
    modalContent: null,

    // Login
    login: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.data.loggedIn) {
                set({
                    authToken: response.data.token,
                    user: response.data.user,
                    loggedIn: true,
                });

                // store the auth token in session storage
                sessionStorage.setItem('authToken', response.data.token);
                sessionStorage.setItem('user', JSON.stringify(response.data.user));

                console.log(`Login successful! Name: ${response.data.user.username}, loggedIn: ${response.data.loggedIn}, authToken: ${response.data.token}`);
                console.log(`Response data:`, response.data);
            } else {
                // if the login failed, throw an error
                throw new Error('Login failed');
            }
        } catch (error) {
            // if there's an error, throw it
            console.error('Login failed:', error);
            throw error;
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
            console.error('Registration failed:', error);
            throw error;
        }
    },

    search: async (searchQuery) => {
        // get the auth token from the store
        const authToken = useStore.getState().authToken;

        if (searchQuery === '') {
            alert('Please enter a search query');
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
        } catch (error) {
            console.error('Search failed:', error);
            alert('Search failed');
        }
    },

    setModalContent(content) {
        set({ modalContent: content });
        //console.log('Modal content:', content); // debugging
    },
}));