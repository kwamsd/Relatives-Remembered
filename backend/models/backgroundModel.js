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

// Récupérer la personnalisation d’un défunt
exports.fetchBackgroundByDeceasedId = async (deceasedId) => {
  const result = await pool.query(
    `SELECT * FROM background WHERE id_deceased = $1`,
    [deceasedId]
  )
  return result.rows[0] || null
}

// Créer ou mettre à jour la personnalisation (upsert)
exports.upsertBackground = async ({ id_deceased, color_main, color_overlay, background_url }) => {
  // Vérifie si une entrée existe
  const existing = await this.fetchBackgroundByDeceasedId(id_deceased)
  if (existing) {
    const result = await pool.query(
      `UPDATE background SET color_main = $1, color_overlay = $2, background_url = $3 WHERE id_deceased = $4 RETURNING *`,
      [color_main, color_overlay, background_url, id_deceased]
    )
    return result.rows[0]
  } else {
    const result = await pool.query(
      `INSERT INTO background (id_deceased, color_main, color_overlay, background_url) VALUES ($1, $2, $3, $4) RETURNING *`,
      [id_deceased, color_main, color_overlay, background_url]
    )
    return result.rows[0]
  }
}
