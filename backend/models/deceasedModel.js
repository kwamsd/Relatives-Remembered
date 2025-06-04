const pool = require('../db');

/* ----------- READ & WRITE ----------- */

exports.getDeceasedByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT id, lastname, firstname
       FROM templates
      WHERE id_user = $1
   ORDER BY date_creation DESC`,
    [userId]
  );
  return rows;
};

exports.insertProfile = async ({
  firstname,
  lastname,
  second_name,
  third_name,
  birth,
  death,
  job,
  nationality,
  gender,
  description,
  image_url,
  user_id,
}) => {
  const { rows } = await pool.query(
    `INSERT INTO templates (firstname, lastname, second_name, third_name,
                             birth, death, job, nationality, gender,
                             description, image_url, id_user)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING *`,
    [
      firstname, lastname, second_name, third_name, birth, death,
      job, nationality, gender, description, image_url, user_id,
    ]
  );
  return rows[0];
};

/**
 * Liste paginée avec filtre d’âge (optionnel).
 * @param {object} opts  { page=1, limit=10, minAge=null }
 */
exports.fetchProfiles = async ({ page = 1, limit = 10, minAge = null } = {}) => {
  const offset = (page - 1) * limit;
  const params = [];
  let sql = 'SELECT * FROM templates';

  if (minAge !== null) {
    params.push(minAge);
    sql += ` WHERE EXTRACT(YEAR FROM COALESCE(death, CURRENT_DATE))
                   - EXTRACT(YEAR FROM birth) >= $1`;
  }

  params.push(limit, offset);
  sql += ` ORDER BY id DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

  const { rows } = await pool.query(sql, params);
  return rows;
};

exports.fetchProfileById = async (id) => {
  const { rows } = await pool.query(
    `SELECT * FROM templates WHERE id = $1`,
    [id]
  );
  return rows[0];
};

exports.updateProfile = async (id, data) => {
  const {
    firstname,
    lastname,
    second_name,
    third_name,
    birth,
    death,
    job,
    nationality,
    gender,
    description,
    image_url,
  } = data;

  const { rows } = await pool.query(
    `UPDATE templates
        SET firstname   = $1,
            lastname    = $2,
            second_name = $3,
            third_name  = $4,
            birth       = $5,
            death       = $6,
            job         = $7,
            nationality = $8,
            gender      = $9,
            description = $10,
            image_url   = $11
      WHERE id = $12
  RETURNING *`,
    [
      firstname, lastname, second_name, third_name, birth, death,
      job, nationality, gender, description, image_url, id,
    ]
  );
  return rows[0];
};
