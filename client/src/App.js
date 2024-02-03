import React, { useState } from 'react';
import axios from 'axios';

import './App.css';
import Header from "./components/Header";
import Hero from "./components/Hero";

function App() {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    // Mock login
    const login = async () => {
        try {
            const { data } = await axios.post('http://localhost:3001/login', { username: 'maria' });
            if (data.loggedIn) {
                console.log("Data:", data);
                console.log("Username:", data.name);
                setUser(data);
                setLoggedIn(true);
                console.log(`Login: ${loggedIn}, User: ${user}`);
            } else {
                alert('Login failed: Invalid username');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed');
        }
    }

    return (
        <div className="App">
            <Header user={user} onLogin={login} />
            <Hero loggedIn={loggedIn} user={user} />
        </div>
    );
}

export default App;
