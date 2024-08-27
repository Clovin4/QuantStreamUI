// File: src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import SignIn from '../pages/auth/login';
import PrivateRoutes from './PrivateRoutes';
import { useNavigate } from 'react-router-dom';

// look for access token in local storage
// if token is present, redirect to dashboard
// else redirect to signin

function Callback() {
    const { handleRedirectCallback } = useAuth0();
    const navigate = useNavigate();
  
    React.useEffect(() => {
      handleRedirectCallback().then(() => {
        navigate('/dashboard'); // or any other route you'd like to redirect to
      }).catch((err) => {
        console.error("Error handling callback:", err);
      });
    }, [handleRedirectCallback, navigate]);
  
    return <div>Loading...</div>;
  }
  
function AppRouter() {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/*" element={isAuthenticated ? <PrivateRoutes /> : <Navigate to="/signin" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;