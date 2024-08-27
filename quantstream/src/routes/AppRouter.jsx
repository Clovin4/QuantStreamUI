// File: src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/authContext';
import SignIn from '../pages/auth/login';
import PrivateRoutes from './PrivateRoutes';

// look for access token in local storage
// if token is present, redirect to dashboard
// else redirect to signin


function AppRouter() {
    const { isLoggedIn } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/*" element={isLoggedIn ? <PrivateRoutes /> : <Navigate to="/signin" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;