import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedUser) {
      setToken(savedToken);
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }

    // Verificar si hay token de OAuth en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('token');
    
    if (oauthToken) {
      // Obtener información del usuario con el token
      fetch('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': `Bearer ${oauthToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          handleLogin(oauthToken, data.user);
        }
      })
      .catch(err => console.error('Error OAuth:', err));
      
      // Limpiar URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleLogin = (token, user) => {
    setToken(token);
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <div className="auth-container">
          {showSignup ? (
            <Signup 
              onSignup={handleLogin} 
              onToggle={() => setShowSignup(false)}
            />
          ) : (
            <Login 
              onLogin={handleLogin} 
              onToggle={() => setShowSignup(true)}
            />
          )}
        </div>
      ) : (
        <Dashboard 
          token={token} 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
