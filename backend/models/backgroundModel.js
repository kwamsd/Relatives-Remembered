const pool = require('../db');

exports.insertBackground = async ({ templateId, userId, url, colorMain, colorOverlay }) => {
  const result = await pool.query(
    `INSERT INTO background (id_template, id_user, background_url, color_main, color_overlay)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id_template) DO UPDATE
     SET background_url = $3, color_main = $4, color_overlay = $5
     RETURNING *`,
    [templateId, userId, url, colorMain, colorOverlay]
  );
  return result.rows[0];
};

exports.fetchBackground = async (templateId) => {
  const result = await pool.query(
    `SELECT * FROM background WHERE id_template = $1`,
    [templateId]
  );
  return result.rows[0];
};
