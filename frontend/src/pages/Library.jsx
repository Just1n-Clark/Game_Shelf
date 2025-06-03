import { useState, useEffect } from 'react';

import GameLibCard from '../components/gameLibCard';

import { useTheme } from '../Hooks/darkMode';
import { useGameLibrary } from '../Contexts/gameLibrary';

import { Typography } from '@mui/material';

const Library = () => {
    // Show all games added to the library from the searh page
    // Will need a database setup to store the games
    // Possibly store them in cookies lol

    // TODO:
    // This context will need an image, prices string, and lowest price string as well.
    // Currently it's only a string
    const { gamesLibrary, setGamesLibrary } = useGameLibrary();
    
    const fetchGames = () => {
        // Fetch games from the database
    }

    // This function will be called when the component is mounted
    useEffect(() => {
        fetchGames();
    }, [])

    useEffect(() => {
        // console.table(gamesLibrary);
    }, [gamesLibrary])

    return (
        <div className='centre-container'>
            <Typography level="h1" sx={{ mb: 2, margin: '2rem' }}>Games</Typography>
            
            {!gamesLibrary.length === 0 ? <h1>No Games in library, go to Search to add some!</h1> :
                <div className="card-grid">
                    {gamesLibrary.map((game, index) => (
                        <GameLibCard
                            game={game}
                            key={game.id || game.storeID || index}
                            onClick={(gameToRemove) => { 
                                setGamesLibrary(prev =>
                                    prev.filter(g => g !== gameToRemove)
                                );
                            }}
                        />
                    ))}
                </div>
            }
        </div>
    )
}

export default Library;
