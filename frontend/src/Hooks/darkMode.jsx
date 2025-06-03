import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [dark, setDark] = useState(() => {
        const saved = localStorage.getItem('darkmode');
        return saved === 'true' ? true : false;
    });

    useEffect(() => {
        localStorage.setItem('darkmode', dark);
        document.body.style.background = dark ? '#111' : '#fff';
        document.body.style.color = dark ? '#fff' : '#111';
    }, [dark])

    const divStyle = {
        background: dark ? '#111' : '#fff',
        color: dark ? '#fff' : '#000',
        height: '100vh',
        transition: 'background-color 0.3s linear',
    };

    const toggleTheme = () => setDark((prev) => !prev);

    return (
        <ThemeContext.Provider value={{ dark, toggleTheme }}>
            <div style={divStyle}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);