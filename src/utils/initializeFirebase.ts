import * as process from "process";
import { initializeApp, getApps } from 'firebase/app'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}

const initializeFirebase = () => getApps().length === 0? initializeApp(firebaseConfig): getApps()[0];

export default initializeFirebase