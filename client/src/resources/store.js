import { create } from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
    user: null,
    loggedIn: false,
    authToken: null,
    searchResults: [],

    // Login
    login: async (username, password) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username, password });
            if (response.data.loggedIn) {
                set({
                    authToken: response.data['auth-token'],
                    user: response.data.user,
                    loggedIn: true
                });
                console.log(`Login successful! Name: ${response.data.user.username}, loggedIn: ${response.data.loggedIn}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    },

    logout: () => set({ user: null, loggedIn: false }),

    search: async (searchQuery) => {
        // get the auth token from the store
        const authToken = useStore.getState().authToken;

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
    }
}));
