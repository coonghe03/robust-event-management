const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
require('./models');

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('Robust Event Management System API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
