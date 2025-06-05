const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fs = require('fs');
require('dotenv').config();

if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads', { recursive: true });
}

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'https://relatives-remembered.vercel.app',  // Frontend Vercel
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// Routes
const authRoutes = require('./routes/auth');
const deceasedRoutes = require('./routes/deceased');
const anecdoteRoutes = require('./routes/anecdotes');

app.use('/auth', authRoutes);
app.use('/api/deceased', deceasedRoutes);
app.use('/api', anecdoteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
