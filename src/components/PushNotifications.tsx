import React, { useEffect } from 'react';
import { messaging } from '../firebase';
import { Button } from '@mui/material';
import { getToken } from 'firebase/messaging';

const PushNotificationButton = () => {


    async function requestPermission() {
        //requesting permission using Notification API
        const permission = await Notification.requestPermission();

        if (permission === "granted") {
            await navigator.serviceWorker.ready;
            const token = await getToken(messaging, {
                vapidKey: 'BNftXrwDmZln0nmpcGlqpMpFZeNdb8gVHLaz0PPZGfcjdw5vLqZhcWiyCdmXpVTO0egWMuVfCQV2GZHgVROoDKI',
            });

            //We can send token to server
            console.log("Token generated : ", token);
        } else if (permission === "denied") {
            //notifications are blocked
            alert("You denied for the notification");
        }
    }

    return (
        <Button variant="contained" onClick={requestPermission}>Enable Push Notifications</Button>
    );
};

export default PushNotificationButton;