import { create } from 'zustand';
import axios from 'axios';

export const useStore = create((set) => ({
    user: null,
    loggedIn: false,
    // Login
    login: async (username) => {
        try {
            const response = await axios.post('http://localhost:3001/login', { username });
            if (response.data.loggedIn) {
                set({ user: { name: response.data.name }, loggedIn: true });
                console.log(`Login successful! Name: ${response.data.name}, loggedIn: ${response.data.loggedIn}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    },
    logout: () => set({ user: null, loggedIn: false }),
}));
