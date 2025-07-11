const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\+?[1-9]\d{1,14}$/
    }
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = User;