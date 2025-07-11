import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';

function UserList() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5000/api/users')
      .then(response => {
        if (!response.ok) throw new Error('Erreur de récupération des utilisateurs');
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        setUsers([]); 
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2 style={{ textAlign: 'center', color: '#0d47a1' }}>Chargement...</h2>;

  return (
    <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f0f8ff', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', padding: '10px', backgroundColor: '#e3f2fd', color: '#0d47a1' }}>
        <h1>📘 Plateforme de Contacts</h1>
      </header>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="🔍 Rechercher un utilisateur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', width: '60%', maxWidth: '400px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
      </div>

      <h2 className="animate__animated animate__fadeInDown" style={{ textAlign: 'center', marginBottom: '20px', color: '#0d47a1' }}>👤 Utilisateurs Disponibles</h2>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {filteredUsers.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#d32f2f' }}>Aucun utilisateur trouvé</p>
        ) : (
          filteredUsers.map(user => (
            <div
              key={user.id}
              className="animate__animated animate__fadeInUp"
              style={{
                border: '1px solid #ccc',
                padding: '15px',
                width: '220px',
                borderRadius: '10px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                textAlign: 'center',
                backgroundColor: '#fff',
                transition: 'transform 0.3s ease',
              }}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '10px',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              <h3>{user.name}</h3>
              <Link to={`/user/${user.id}`}>
                <button
                  className="animate__animated animate__bounceIn"
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#61dafb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor = '#4fa8d5'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor = '#61dafb'}
                >
                  Voir Profil
                </button>
              </Link>
            </div>
          ))
        )}
      </div>

      <footer style={{ marginTop: '40px', padding: '10px', textAlign: 'center', color: '#777' }}>
        <p>© 2025 Solyntek - Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default UserList;