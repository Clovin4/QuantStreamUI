import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import AppRouter from '@/routes/AppRouter';

function App() {
  return (
    <Auth0Provider
      domain="dev-i7q6av0ppoxiyc4y.us.auth0.com"
      clientId="MCcx8jNtoP6dn2XxlABp87MXE618gb6Y"
      redirectUri="http://localhost:5173/signin"
      audience="https://dev-i7q6av0ppoxiyc4y.us.auth0.com/api/v2/"
      scope="openid profile email"
    >
      <AppRouter />
    </Auth0Provider>
  );
}

export default App;
