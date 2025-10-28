import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList({ token }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        email: user.email,
        password: ''
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        email: '',
        password: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({ username: '', email: '', password: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.email.trim()) {
      setError('Username y email son requeridos');
      return;
    }

    if (!editingUser && !formData.password.trim()) {
      setError('La contraseña es requerida para crear un usuario');
      return;
    }

    try {
      const dataToSend = {
        username: formData.username,
        email: formData.email
      };

      if (!editingUser || formData.password) {
        dataToSend.password = formData.password;
      }

      if (editingUser) {
        await axios.put(
          `http://localhost:5000/api/users/${editingUser._id}`,
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/users',
          dataToSend,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      
      closeModal();
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar usuario');
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || 'Error al eliminar usuario');
      }
    }
  };

  if (loading) return <div className="loading">Cargando usuarios...</div>;

  return (
    <div className="user-list">
      <div className="user-list-header">
        <h2>Lista de Usuarios</h2>
        <button onClick={() => openModal()} className="btn btn-primary">
          + Crear Usuario
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {users.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.username}</h3>
              <p>Email: {user.email}</p>
              <p>Proveedor: {user.provider}</p>
              <p>Creado: {new Date(user.createdAt).toLocaleDateString()}</p>
              <div className="user-actions">
                <button 
                  onClick={() => openModal(user)} 
                  className="btn btn-secondary btn-small"
                >
                  Editar
                </button>
                <button 
                  onClick={() => deleteUser(user._id)} 
                  className="btn btn-danger btn-small"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editingUser ? 'Editar Usuario' : 'Crear Usuario'}</h3>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username *</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                  placeholder="Nombre de usuario"
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div className="form-group">
                <label>{editingUser ? 'Nueva Contraseña (opcional)' : 'Contraseña *'}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required={!editingUser}
                  placeholder="********"
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="btn btn-primary">
                  {editingUser ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" onClick={closeModal} className="btn btn-secondary">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;