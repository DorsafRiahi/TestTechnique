// src/components/UserProfile.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import emailjs from '@emailjs/browser';
import 'animate.css';

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/users/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Utilisateur introuvable');
        return response.json();
      })
      .then(data => setUser(data))
      .catch(error => {
        console.error('Erreur lors de la récupération de l’utilisateur :', error);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEmail = () => {
    const templateParams = {
      to_email: user.email,
      to_name:  user.name,
      title:    "Notification de la plateforme Solyntek"
    };

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
      )
      .then(() => {
        toast.success(`✉️ Email envoyé à ${user.name}`);
      })
      .catch(err => {
        console.error('EmailJS error:', err);
        toast.error("❌ Erreur lors de l'envoi de l'email.");
      });
  };

  const handleWhatsApp = () => {
    const phone = user.phone.replace('+', '');
    window.open(`https://wa.me/${phone}`, '_blank');
    setTimeout(() => {
      toast.success(`📱 Message WhatsApp prêt pour ${user.name}`);
    }, 1000);
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center', color: '#0d47a1' }}>Chargement...</h2>;
  }

  if (!user) {
    return <h2 style={{ textAlign: 'center', color: '#d32f2f' }}>Utilisateur introuvable</h2>;
  }

  return (
    <div style={{
      padding: '40px',
      textAlign: 'center',
      backgroundColor: '#f0f8ff',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <header
        className="animate__animated animate__fadeInDown"
        style={{
          marginBottom: '30px',
          padding: '10px',
          backgroundColor: '#e3f2fd',
          color: '#0d47a1'
        }}
      >
        <h1>👤 Profil Utilisateur</h1>
      </header>

      <div
        className="animate__animated animate__fadeInUp"
        style={{
          display: 'inline-block',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          backgroundColor: '#fff'
        }}
      >
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '20px',
            transition: 'transform 0.3s ease'
          }}
          onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <h2>{user.name}</h2>
        <p>Email : {user.email}</p>
        <p>Téléphone : {user.phone}</p>

        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleEmail}
            className="animate__animated animate__bounceIn"
            style={{
              marginRight: 10,
              backgroundColor: '#61dafb',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#4fa8d5')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#61dafb')}
          >
            ✉️ Envoyer un Email
          </button>

          <button
            onClick={handleWhatsApp}
            className="animate__animated animate__bounceIn"
            style={{
              backgroundColor: '#25D366',
              color: '#fff',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#128C7E')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#25D366')}
          >
            📱 WhatsApp
          </button>
        </div>
      </div>

      <footer style={{ marginTop: '40px', padding: '10px', textAlign: 'center', color: '#777' }}>
        <p>© 2025 Solyntek - Tous droits réservés.</p>
      </footer>
    </div>
  );
}

export default UserProfile;
