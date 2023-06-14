import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {HashRouter} from "react-router-dom";
import FirebaseContext from "./contexts/FirebaseContext";
import './index.sass';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

document.addEventListener("touchstart", function () {
}, true);
root.render(
    <React.StrictMode>
        <FirebaseContext>
            <HashRouter>
                <App/>
            </HashRouter>
        </FirebaseContext>
    </React.StrictMode>
);
