const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const templateRoutes = require('./routes/template');
const deceasedRoutes = require('./routes/deceased');
const anecdoteRoutes = require('./routes/anecdotes');
const backgroundRoutes = require('./routes/backgrounds');

app.use('/api/deceased', deceasedRoutes);
app.use('/api', anecdoteRoutes);
app.use('/api', backgroundRoutes);

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/templates', templateRoutes);

// // Routes
// const deceasedRoutes = require('./routes/deceased');
// app.use('/api/deceased', deceasedRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
