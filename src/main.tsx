import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@store/configureStore';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <PersistGate persistor={persistor}>
            <Provider store={store}>
                <App />
            </Provider>
        </PersistGate>
    </React.StrictMode>,
);
