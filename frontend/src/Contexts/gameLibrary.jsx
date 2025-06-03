import { createContext, useContext, useState, useEffect } from 'react';

const GameLibraryContext = createContext();

export const useGameLibrary = () => useContext(GameLibraryContext);

export const GameLibraryProvider = ({ children }) => {
    const [gamesLibrary, setGamesLibrary] = useState(() => {
        // Load from localStorage
        const saved = localStorage.getItem('gamesLibrary');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('gamesLibrary', JSON.stringify(gamesLibrary));
    }, [gamesLibrary]);

    return (
        <GameLibraryContext.Provider value={{ gamesLibrary, setGamesLibrary }}>
            { children }
        </GameLibraryContext.Provider>
    )
};