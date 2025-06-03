const pool = require('../db');

// Soumettre une anecdote (non approuvée par défaut)
exports.insertAnecdote = async ({ templateId, content, firstname }) => {
  const result = await pool.query(
    `INSERT INTO anecdote (id_template, content, firstname, is_approved, date_submitted)
     VALUES ($1, $2, $3, false, NOW())
     RETURNING *`,
    [templateId, content, firstname]
  );
  return result.rows[0];
};

// Récupérer les anecdotes approuvées pour un profil
exports.fetchApproved = async (templateId) => {
  const result = await pool.query(
    `SELECT * FROM anecdote WHERE id_template = $1 AND is_approved = true ORDER BY date_submitted DESC`,
    [templateId]
  );
  return result.rows;
};

// Valider une anecdote (par l’auteur du profil)
exports.setApproved = async (anecdoteId, approved = true) => {
  const result = await pool.query(
    `UPDATE anecdote SET is_approved = $1 WHERE id = $2 RETURNING *`,
    [approved, anecdoteId]
  );
  return result.rows[0];
};
