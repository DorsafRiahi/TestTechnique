const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query('CREATE DATABASE IF NOT EXISTS usercontactdb');
    await sequelize.sync({ alter: true });
    console.log('Connexion à la base de données et synchronisation réussies.');
  } catch (error) {
    console.error('Erreur de connexion ou de synchronisation:', error);
  }
})();

module.exports = sequelize;