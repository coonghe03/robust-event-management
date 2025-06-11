const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/db');

// Load models
const Event = require('./Event');

// Sync models with DB
sequelize.sync({ alter: true }) // Use { force: true } to drop and recreate
  .then(() => {
    console.log("All models synced successfully.");
  })
  .catch((err) => {
    console.error("Model sync failed:", err);
  });

module.exports = {
  Event,
};
