import React, { useState, useEffect } from 'react';
import Toggle from '../components/Toggle';

import './App.css';

const App = () => {

    const [darkMode, setDarkMode] = useState(false);
    const [bgColor, setBgColor] = useState('white');
    const [textColor, setTextColor] = useState('black');

    const handleToggle = () => {
        setDarkMode(!darkMode);
        setBgColor(darkMode ? 'white' : 'black');
        setTextColor(darkMode ? 'black' : 'white');
    }

    useEffect(() => {
        console.log('Dark mode is ' + (darkMode ? 'on' : 'off'));
    }, [darkMode]);

    return (
        <div
            style={{
                backgroundColor: bgColor, 
                color: textColor,
                height: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center'
            }}>
            <h1>Welcome to Game Shelf!</h1>
            <p>Find the best deals on your favorite games!</p>

            <p>Dark Mode</p>
            <Toggle onChange={handleToggle} />
            
            <p>This site uses <a href='https://apidocs.cheapshark.com'>CheapSharkAPI</a></p>
        </div>
    )
}

export default App;
