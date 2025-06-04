const pool = require('../db')

exports.getDeceasedByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT id, lastname, firstname
       FROM templates
       WHERE id_user = $1
       ORDER BY created_at DESC`,
    [userId]
  )
  return rows
}

// Créer un profil de défunt
exports.insertProfile = async ({
  firstname, lastname, second_name, third_name, birth, death, job, nationality, gender, description, image_url, user_id
}) => {
  const result = await pool.query(
    `INSERT INTO templates (firstname, lastname, second_name, third_name, birth, death, job, nationality, gender, description, image_url, id_user)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
     RETURNING *`,
    [firstname, lastname, second_name, third_name, birth, death, job, nationality, gender, description, image_url, user_id]
  );
  return result.rows[0];
};

// Liste paginée + filtre âge
exports.fetchProfiles = async () => {
  const result = await pool.query(
    `SELECT * FROM templates ORDER BY id DESC`
  );
  return result.rows;
};

// Profil complet par id
exports.fetchProfileById = async (id) => {
  const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
  return result.rows[0];
};

exports.updateProfile = async (id, data) => {
  const {
    firstname, lastname, second_name, third_name, birth, death,
    job, nationality, gender, description, image_url
  } = data

  const result = await pool.query(
    `UPDATE templates SET
      firstname = $1,
      lastname = $2,
      second_name = $3,
      third_name = $4,
      birth = $5,
      death = $6,
      job = $7,
      nationality = $8,
      gender = $9,
      description = $10,
      image_url = $11
    WHERE id = $12
    RETURNING *`,
    [firstname, lastname, second_name, third_name, birth, death, job, nationality, gender, description, image_url, id]
  )
  return result.rows[0]
}
