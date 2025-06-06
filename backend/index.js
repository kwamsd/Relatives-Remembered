const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());


// Routes
const authRoutes      = require('./routes/auth');
const deceasedRoutes  = require('./routes/deceased');
const anecdoteRoutes  = require('./routes/anecdotes');

app.use('/auth', authRoutes);
app.use('/api/deceased', deceasedRoutes);
app.use('/api', anecdoteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
