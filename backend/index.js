// backend/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');        // ← import
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',  // ton front Vite
  credentials: true                 // autorise l'envoi des cookies
}));
app.use(express.json());
app.use(cookieParser());            // ← ajoute cookie-parser

// Routes
const authRoutes = require('./routes/auth.js');
app.use('/auth', authRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
