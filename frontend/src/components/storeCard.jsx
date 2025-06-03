import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';

import { useTheme } from '../Hooks/darkMode';

/* isActive, storeID, storeName */ 
const StoreCard = ({ store, onClick }) => {
    const { dark } = useTheme();

    const name = store.storeName;
    const isActive = store.isActive;
    const ID = store.ID;

    console.table([name, isActive, ID])

    return (
        <Card sx={{
            width: '100%',
            background: dark
                ? "rgba(45, 50, 59, 0.92)"
                : "rgba(255, 255, 255, 0.92)",
            color: dark ? "#fff" : "#fff", // black or white
            border: dark ? "1px solid #444" : "1px solid #ccc",
            boxShadow: dark
                ? "0 2px 8px rgba(0,0,0,0.7)"
                : "0 2px 8px rgba(0,0,0,0.1)",
            padding: 2,
            transition: "background 0.3s, color 0.3s"
        }}>
            <div>
                <Typography level="title-lg">{store.storeName ? store.storeName : "Error getting name"}</Typography>
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
                    }}
                    >
                    icon
                </IconButton>
            </div>

            <AspectRatio>
                <img
                    src={store.images || ""}
                    loading="lazy"
                    alt="Store Image"
                    />
            </AspectRatio>
            <CardContent orientation='horizontal'>
                <div>
                    <Typography 
                        level='body-sm'
                        sx={{
                            color: store.isActive ? '#47e519' : '#e51919'
                        }}
                    >
                        {store.isActive ? '- Active -' : '- InActive -'}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    )
}

export default StoreCard;