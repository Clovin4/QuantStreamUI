import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (username) => {
    console.log('login', username);
    setIsLoggedIn(true);
    setUsername(username);
  }
  const logout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const obtainTokens = async (username, password) => {
//   const response = await fetch(`${BASE_URL}/api/services/obtain-tokens/`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username, password }),
//   });

//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }

//   const data = await response.json();
//   return data;
// };