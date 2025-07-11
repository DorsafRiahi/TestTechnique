// index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Définir un port par défaut si non défini dans .env
const PORT = process.env.PORT || 5000;

// Connexion à la base + sync Sequelize
db.sync({ alter: true }) // { force: true } pour reset complet si besoin
  .then(() => {
    console.log('✅ Base de données synchronisée');
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur le port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Erreur de connexion à la base de données :', err);
  });
