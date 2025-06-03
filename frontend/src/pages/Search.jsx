import { useState, useEffect } from 'react';
import GameCard from "../components/gameCard";
import StoreCard from "../components/storeCard"
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import SearchIcon from '@mui/icons-material/search';

import { useTheme } from '../Hooks/darkMode';
import { useGameLibrary } from '../Contexts/gameLibrary';
import axios from 'axios';
import { Icon, Typography } from '@mui/material';

const Search = () => {
    const [games, setGames] = useState([]);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("")

    const [storeQuery, setStoreQuery] = useState("");
    const [debouncedStoreQuery, setDebouncedStoreQuery] = useState("");

    const { gamesLibrary, setGamesLibrary } = useGameLibrary();

    const { dark } = useTheme();

    const API_URL = 'http://localhost:5000/api/';

    const fetchGames = async () => {
        setLoading(true)
        axios.get(API_URL + 'games', {
            params: debouncedQuery ? { title : debouncedQuery } : {}
        })
            .then((response) => {
                // console.log(response.data);
                if (!response.data) {
                    console.error('No data found in response');
                    return
                }
                setGames(response.data);
            })
            .catch((error) => {
                console.error('Error fetching games:', error);
                console.log(response.data)
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    const fetchStores = async () => {
        setLoading(true)

        axios.get(API_URL + 'stores')
            .then((response) => {
                // console.table("Response from /api/stores: ", response.data);
                if (!response.data) {
                    console.error('No data found in the request')
                    return
                }
                setStores(response.data);
            })
            .catch((error) => {
                console.error(`Error fetching games: Response is: ${response.data}`, error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchGames();
    }, [debouncedQuery])

    useEffect(() => {
        fetchStores();
    }, [debouncedStoreQuery])

    // Debounce for games
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [query]);

    // Debounce for stores
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedStoreQuery(storeQuery);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [storeQuery]);

    useEffect(() => {
        console.table(`Game library: ${gamesLibrary}`);
    }, [gamesLibrary])

    return (
        <div className="centre-container" style={{ background: dark ? '#111' : '#fff', color: dark ? '#fff': '#111'}}>
            <h1>Search</h1>
            <hr style={{ width: '250px', margin: '1rem'}}/>
            <p>Here you can search for any games and see which stores stock them</p>
            <hr style={{ width: '400px', margin: '1rem'}}/>

            {/* Games Section */}
            <Input
                placeholder='Search for a game...'
                onChange={e => setQuery(e.target.value)}
                startDecorator={
                    <IconButton variant='plain' color='primary'>
                        <SearchIcon />
                    </IconButton>
                }
                sx={{
                    mb: 2,
                    width: 320,
                    background: dark ? '#222' : '#fff',
                    color: dark ? '#fff' : '#000', // ( Dark mode ) White / ( Light mode ) Black
                    border: dark ? "1px solid #444" : "1px solid #ccc"
                }}
            />

            {/* Stores section */}
            <Input
                placeholder='Search for a store'
                onChange={e => setStoreQuery(e.target.value)}
                startDecorator={
                    <IconButton variant='plain' color='primary'>
                        <SearchIcon />
                    </IconButton>
                }
                sx={{
                    mb: 2,
                    width: 250,
                    background: dark ? '#222' : '#fff',
                    color: dark ? '#fff' : '#000',
                    border: dark ? '1px solid #444' : '1px solid #ccc'
                }}
            />

            {loading ? <p>Loading...</p> : (
                <Box className="card-container">
                    
                    {/* Games section */}

                    <Typography level="h1" sx={{ mb: 2, margin: '2rem' }}>Games</Typography> 
                    <div className="card-grid">
                        {games
                        .filter(game =>
                            game.external.toLowerCase().includes(debouncedQuery.toLowerCase())
                        )
                        .map((game, index) => (
                            <GameCard
                                game={game}
                                key={game.id || game.storeID || index}
                                onClick={() => { 
                                    let newGame = game.external;

                                    console.log(`Clicked on ${game.external}`);

                                    if (!gamesLibrary.includes(newGame)) {
                                        setGamesLibrary(current => [...current, newGame]);
                                    }
                                }}
                            />
                        ))}
                    </div>

                    {/* Stores section */}

                    <Typography level="h5" style={{ mb: 2, margin: '2rem' }}>Stores</Typography>

                    {/* FIXME: This won't display. Stores doesn't make it into StoreCard. Data is retrieved from the API. Check that stores is set. Most likley cause*/}
                    <div className='card-grid'>
                        {stores
                        .filter(store =>
                            store.storeName.toLowerCase().includes(debouncedStoreQuery.toLowerCase())
                        )
                        .map((store, index) => {
                            <StoreCard
                                store={store}
                                key={store.id || store.storeID || index}
                                onClick={() => console.log(`Clicked on ${store.storeName}`)}
                            />
                        })}
                    </div>

                    <div className='card-grid'></div>
                </Box>
            )}
        </div>
    )
}

export default Search;