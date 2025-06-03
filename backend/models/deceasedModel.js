const pool = require('../db');

// Créer un profil de défunt
exports.insertProfile = async ({ firstname, lastname, birth, death, biography, photo_url, theme, user_id }) => {
  const result = await pool.query(
    `INSERT INTO template (firstname, lastname, "Birth", death, description, image_url, theme, id_user)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [firstname, lastname, birth, death, biography, photo_url, theme, user_id]
  );
  return result.rows[0];
};

// Liste paginée + filtre âge
exports.fetchProfiles = async ({ page = 1, limit = 10, minAge = 7 }) => {
  const offset = (page - 1) * limit;
  const result = await pool.query(
    `SELECT * FROM template WHERE EXTRACT(YEAR FROM AGE(CURRENT_DATE, "Birth")) >= $1
     ORDER BY id DESC LIMIT $2 OFFSET $3`,
    [minAge, limit, offset]
  );
  return result.rows;
};

// Profil complet par id
exports.fetchProfileById = async (id) => {
  const result = await pool.query('SELECT * FROM template WHERE id = $1', [id]);
  return result.rows[0];
};
