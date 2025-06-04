// backend/index.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');        // ← import
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;



// Middlewares
app.use(cors({
  origin: 'http://localhost:5173',  // ton front Vite
  credentials: true                 // autorise l'envoi des cookies
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());            // ← ajoute cookie-parser

// Routes
const authRoutes = require('./routes/auth.js');
const deceasedRoutes = require('./routes/deceased');
const anecdoteRoutes = require('./routes/anecdotes');

app.use('/api/deceased', deceasedRoutes);
app.use('/api', anecdoteRoutes);
app.use('/auth', authRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
