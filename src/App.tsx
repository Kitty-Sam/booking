import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { Booking } from '@/pages/Booking';
import { useEffect } from 'react';
import { persistor } from '@store/configureStore';

export const routes = [
    { id: 1, path: '/', element: <Home /> },
    { id: 2, path: '/profile', element: <Profile /> },
    { id: 3, path: '/booking', element: <Booking /> },
];

export const App = () => {
    useEffect(() => {
        persistor.purge();
    });

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {routes.map(({ path, element, id }) => (
                        <Route path={path} element={element} key={id} />
                    ))}
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
};
