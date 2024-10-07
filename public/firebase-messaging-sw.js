// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
    "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
    apiKey: true,
    projectId: true,
    messagingSenderId: true,
    appId: true,
};

firebase.initializeApp({
    apiKey: "AIzaSyCgqoXGOv4dSYJzZ91hEsV7L8oEHCVbJxg",
    authDomain: "wedding-b580c.firebaseapp.com",
    databaseURL: "https://wedding-b580c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wedding-b580c",
    storageBucket: "wedding-b580c.appspot.com",
    messagingSenderId: "1000310693470",
    appId: "1:1000310693470:web:f05370ec3721024ee51ecf",
    measurementId: "G-T9V4SMR2MD"
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.image,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});