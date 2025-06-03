import { Link, Outlet } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

import  { useTheme } from '../Hooks/darkMode';

const Layout = () => {
    const { dark } = useTheme();
    
    return (
        <div>
            <Sheet
                variant="soft"
                color={dark ? "primary" : "neutral"}
                sx={{
                    width: '100%',
                    maxWidth: '900px',
                    mx: 'auto',
                    px: 2,
                    py: 1.5,
                    mb: 3,
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: 'md',
                    backgroundColor: dark ? 'rgba(30,34,40,0.95)' : 'rgba(255,255,255,0.95)',
                    transition: 'background 0.3s, color 0.3s',
                }}
            >
                <Stack direction="row" spacing={3} alignItems="center">
                    {[
                        { to: "/", label: "Home" },
                        { to: "/library", label: "Library" },
                        { to: "/search", label: "Search" },
                        { to: "/about", label: "About" },
                        { to: "/settings", label: "Settings" }
                    ].map(({ to, label }) => (
                        <Button
                            key={to}
                            component={Link}
                            to={to}
                            variant={dark ? "solid" : "soft"}
                            color={dark ? "primary" : "neutral"}
                            sx={{
                                fontWeight: 600,
                                fontSize: '1.05rem',
                                px: 2.5,
                                py: 1,
                                borderRadius: 1.5,
                                transition: 'background 0.2s, color 0.2s',
                                '&:hover': dark
                                    ? {
                                        backgroundColor: 'primary.softBg',
                                        color: 'primary.solidColor',
                                    }
                                    : {
                                        backgroundColor: 'primary.solidBg',
                                        color: 'primary.softColor',
                                    },
                            }}
                        >
                            {label}
                        </Button>
                    ))}
                </Stack>
            </Sheet>

            <main>
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;