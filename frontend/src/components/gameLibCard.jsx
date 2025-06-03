import AspectRatio from '@mui/joy/AspectRatio';
import CardContent from '@mui/joy/CardContent';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useTheme } from '../Hooks/darkMode';

const GameLibCard = ({ game, onClick }) => {
    const { dark } = useTheme();

    console.log(game);

    return (
        <Card sx={{
            width: '100%',
            '--Card-background': dark // Set Joy UI lib variables, otherwise default sx will be overwritten...
                ? "rgba(45, 50, 59, 0.92)"
                : "rgba(255, 255, 255, 0.92)",
            '--Card-color': dark ? "#f3f3f3" : "#222", // Same as Card-background...
            border: dark ? "1px solid #444" : "1px solid #ccc",
            boxShadow: dark
                ? "0 2px 8px rgba(0,0,0,0.7)"
                : "0 2px 8px rgba(0,0,0,0.1)",
            padding: 2,
            transition: "background 0.3s, color 0.3s"
        }}>
            <div>
                <Typography level="title-lg">{game ? game : "Error getting name"}</Typography>
                <Typography level="body-sm"></Typography>
                <IconButton
                    aria-label='bookmark bahamas Islands'
                    variant="plain"
                    color='neutral'
                    size='sm'
                    sx={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        color: '#FF0000'
                    }}
                    onClick={() => onClick(game)}
                    >
                    <RemoveIcon />
                </IconButton>
            </div>

            <AspectRatio>
                <img
                    src={game.thumb}
                    loading="lazy"
                    alt="Game image"
                    />
            </AspectRatio>
            <CardContent orientation='horizontal'>
                <div>
                    <Typography level="body-xs">Price:</Typography>
                    <Typography level='body-sm'>Lowest price: ${game.cheapest}+</Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default GameLibCard;
