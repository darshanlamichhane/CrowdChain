import React from 'react';
import  ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {ChainId, ThirdwebProvider} from '@thirdweb-dev/react';

import { StateContextProvider } from './context';
import App from './App';
import './index.css';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ThirdwebProvider activeChain="goerli" clientId="61698ec9e8dd2db8599798738472c14e">
            <BrowserRouter>
            <StateContextProvider>

            <App />
            </StateContextProvider>
            </BrowserRouter>
    </ThirdwebProvider>
);
