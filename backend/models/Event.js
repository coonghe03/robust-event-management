const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organizer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'events', // Optional: set custom table name
  timestamps: true,    // createdAt & updatedAt
});

module.exports = Event;
