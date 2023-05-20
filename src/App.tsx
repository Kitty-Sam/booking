import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Profile } from '@/pages/Profile';
import { Booking } from '@/pages/Booking';

export const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="booking" element={<Booking />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
};
