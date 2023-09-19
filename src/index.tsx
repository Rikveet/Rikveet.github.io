import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from "@/App";
import {Provider} from "react-redux";
import store from "@reduxStore/store";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@styles/index.css';
import initializeFirebase from "@utils/initializeFirebase";


const root = createRoot(
    document.getElementById('root') as HTMLElement
);

initializeFirebase();

document.addEventListener("touchstart", function () {
}, true);
root.render(
    <StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </StrictMode>
);
