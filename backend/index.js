require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Relatives-Remembers en ligne !');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend sur http://localhost:${PORT}`);
});

const { Pool } = require('pg');
const pool = new Pool();

app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
