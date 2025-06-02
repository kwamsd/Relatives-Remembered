// backend/models/userModel.js
const pool = require('../db');

exports.createUser = async ({ lastname, firstname, mail, password, mobilephone, username }) => {
  const result = await pool.query(
    `INSERT INTO users (lastname, firstname, mail, password, mobilephone, username)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, mail`,
    [lastname, firstname, mail, password, mobilephone, username]
  );
  return result.rows[0];
};

exports.getUserByEmail = async (mail) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE mail = $1`,
    [mail]
  );
  return result.rows[0];
};

exports.getUserByUsername = async (username) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  return result.rows[0];
};

exports.getUserById = async (id) => {
  const result = await pool.query(
    `SELECT id, lastname, firstname, mail, username, mobilephone
     FROM users WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};
