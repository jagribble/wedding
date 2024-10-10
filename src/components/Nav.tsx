import { useAuth0 } from "@auth0/auth0-react";
import NotificationIcon from '@mui/icons-material/Notifications';
import { AppBar, Avatar, Box, Button, Container, Icon, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { systemUI } from "../pages/ResponseForm";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

interface Page {
    name: string;
    url: string;
    external?: boolean;
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  

// const pages: Page[] = [{ name: 'Bio', url: '/bio' }]
const pages: Page[] = []

const useStyles = makeStyles()((theme) => ({
    appBar: {
        display: 'flex'
    },
    pages: {
        justifyContent: 'end',
    },
    outlet: {
        marginTop: 60,
        zIndex: 10000,
        height: 'calc(100vh)',
        [theme.breakpoints.only('xs')]: {
            marginTop: 57,
        }
    },
    video: {
        position: 'fixed',
        right: 0,
        bottom: 0,
        minWidth: '100%',
        minHeight: '100%'
    },
    buttons: {
        color: 'black',
        borderColor: 'black',
        '&:': {
            borderColor: 'black',
        }
    }
}));

const vapidKey = {
    "publicKey": "BImvJhNMyHKP_e1y7Dgp7xfvUzAHw3rLl2GY5g5eS81EIqvgZ1ppaaWjx7_I1DBZRJiR4yDqN5TdSvxSTEGzWwU",
}

export function Nav() {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    const navigateTo = useCallback((page: Page) => {
        if (page.external) {
            window.location.href = page.url;
            return;
        }
        navigate(page.url);
    }, [navigate]);

    async function requestPushPermission() {
        console.log('request perms')
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            await navigator.serviceWorker.ready;
            console.log('Try and get service worker')
            navigator.serviceWorker.getRegistration().then(registration => {
                console.log('reg',registration);
                if (registration) {
                    registration.pushManager
                        .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(vapidKey.publicKey),
                        })
                        .then((subscription) => {
                            console.log(subscription); // This will log fcm endpoint!
                            fetch(`https://api.emmaandjules.info/push/set`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    sub: subscription
                                })
                            }).then(() => console.log('Subscription made'))
                        });
                }

            });
            console.log('Gone pass the block of code')
            // const token = await getToken(messaging, {
            //     // vapidKey: 'BNftXrwDmZln0nmpcGlqpMpFZeNdb8gVHLaz0PPZGfcjdw5vLqZhcWiyCdmXpVTO0egWMuVfCQV2GZHgVROoDKI',
            //     vapidKey: 'BImvJhNMyHKP_e1y7Dgp7xfvUzAHw3rLl2GY5g5eS81EIqvgZ1ppaaWjx7_I1DBZRJiR4yDqN5TdSvxSTEGzWwU'
            // });
           
            // //We can send token to server
            // console.log("Token generated : ", token);
        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }
    }

    return (
        <>
            <AppBar position="fixed" color="primary">
                <Container maxWidth="xl" >
                    <Toolbar disableGutters className={classes.appBar}>
                        <Typography variant="h6" sx={{ flex: 1 }} onClick={() => navigate('/')}>Emma & Jules</Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className={classes.pages}>
                            {/* {isAuthenticated ? (
                                <>
                                    {/* <Typography>{user?.name}</Typography> }
                            <Avatar srcSet={user?.picture} alt={user?.name} />

                        </>
                        ) : (
                        <Button variant="outlined" className={classes.buttons} onClick={() => loginWithRedirect()} color="info">Login</Button>
                            )} */}

                        </Box>
                        {window.matchMedia('(display-mode: standalone)').matches && Notification.permission !== 'granted' && (
                            <IconButton
                                onClick={requestPushPermission}
                            >
                                <NotificationIcon />

                            </IconButton>
                        )}

                    </Toolbar>
                </Container>
            </AppBar>
            <div className={classes.outlet}>
                <Outlet />

            </div>
            {/* <video autoPlay muted loop className={classes.video} playsInline>
                <source src="highfieldpark.mp4" type="video/mp4" />
            </video> */}
        </>
    );
}