import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";

interface Page {
    name: string;
    url: string;
    external?: boolean;
}

// const pages: Page[] = [{ name: 'Bio', url: '/bio' }]
const pages: Page[] = []

const useStyles = makeStyles()((theme) => ({
    appBar: {
        display: 'flex'
    },
    pages: {
        justifyContent: 'end'
    },
    outlet: {
        marginTop: 60,
        zIndex: 10000,
    }, video: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%'
    },
}));

export function Nav() {
    const { classes } = useStyles();
    const navigate = useNavigate();

    const navigateTo = useCallback((page: Page) => {
        if (page.external) {
            window.location.href = page.url;
            return;
        }
        navigate(page.url);
    }, [navigate]);

    return (
        <>
            <AppBar position="fixed" color="primary">
                <Container maxWidth="xl" >
                    <Toolbar disableGutters className={classes.appBar}>
                        <Typography variant="h6" sx={{}} onClick={() => navigate('/')}>Emma & Jules</Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className={classes.pages}>
                            {pages.map((page) => (
                                <Button
                                    key={page.name}
                                    onClick={() => navigateTo(page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <div className={classes.outlet}>
                <Outlet />

            </div>
            <video autoPlay muted loop className={classes.video} playsInline>
                <source src="highfieldpark.mp4" type="video/mp4" />
            </video>
        </>
    );
}