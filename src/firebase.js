import { initializeApp, messaging as firebaseMessaging } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: "AIzaSyCgqoXGOv4dSYJzZ91hEsV7L8oEHCVbJxg",
    authDomain: "wedding-b580c.firebaseapp.com",
    databaseURL: "https://wedding-b580c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wedding-b580c",
    storageBucket: "wedding-b580c.appspot.com",
    messagingSenderId: "1000310693470",
    appId: "1:1000310693470:web:f05370ec3721024ee51ecf",
    measurementId: "G-T9V4SMR2MD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);