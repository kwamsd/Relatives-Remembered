// backend/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');        // ← import
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
app.use(cors({
  origin: 'http://localhost:5173',  // ton front Vite
  credentials: true                 // autorise l'envoi des cookies
}));
app.use(express.json());
app.use('/api/templates', templateRoutes);

app.use(cookieParser());            // ← ajoute cookie-parser

// Routes
const authRoutes = require('./routes/auth.js');
app.use('/auth', authRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});
// // Routes
// const deceasedRoutes = require('./routes/deceased');
// app.use('/api/deceased', deceasedRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
