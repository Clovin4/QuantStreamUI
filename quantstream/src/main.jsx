import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CityProvider } from './context/CityContext.jsx';
import { AuthProvider } from '@/lib/authContext.jsx'; // Import AuthProvider
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <CityProvider>
        <App />
      </CityProvider>
    </AuthProvider>
  </StrictMode>,
);