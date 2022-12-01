// Import the functions you need from the SDKs you need
import * as React from 'react';
import {ReactNode} from 'react';
import {FirebaseApp, getApp, getApps, initializeApp} from "firebase/app";
import {connectAuthEmulator, getAuth} from "firebase/auth";
import {connectFirestoreEmulator, getFirestore} from "firebase/firestore";
import {connectStorageEmulator, getStorage} from "firebase/storage";

const {initializeAppCheck, ReCaptchaV3Provider} = require("firebase/app-check");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

function getFirebaseApp(): FirebaseApp {
    const firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const storage = getStorage(firebaseApp);
    // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
    // key is the counterpart to the secret key you set in the Firebase console.
    if (!process.env.REACT_APP_SERVICE_MODE || process.env.REACT_APP_SERVICE_MODE === 'development') {
        window.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.REACT_APP_DEBUG_TOKEN;
        connectAuthEmulator(auth, "http://localhost:9099");
        connectFirestoreEmulator(db, 'localhost', 8080);
        connectStorageEmulator(storage, "localhost", 9199);
    }
    const appCheck = initializeAppCheck(firebaseApp, {
        provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA),
        // Optional argument. If true, the SDK automatically refreshes App Check
        // tokens as needed.
        isTokenAutoRefreshEnabled: true
    });
    return firebaseApp;
}

export const FirebaseContext = React.createContext<FirebaseApp | undefined>(undefined);

function FirebaseContextProvider(props: { children: ReactNode }) {

    return (
        <FirebaseContext.Provider value={getFirebaseApp()}>{props.children}</FirebaseContext.Provider>
    );
}

export default FirebaseContextProvider;
