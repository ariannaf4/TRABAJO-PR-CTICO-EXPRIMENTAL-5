import React from 'react';
import UserList from './UserList';

function Dashboard({ token, currentUser, onLogout }) {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Sistema de Usuarios</h1>
          <span className="db-indicator">MongoDB</span>
        </div>
        <div className="user-info">
          <span>Bienvenido, {currentUser.username}</span>
          <button onClick={onLogout} className="btn btn-danger">
            Cerrar Sesión
          </button>
        </div>
      </div>

      <UserList token={token} />
    </div>
  );
}

export default Dashboard;
