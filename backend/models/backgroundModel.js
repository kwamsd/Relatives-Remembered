const pool = require('../db');

/** Récupère la personnalisation d’un profil (couleurs + image) */
exports.fetchBackgroundByTemplateId = async (templateId) => {
  const { rows } = await pool.query(
    `SELECT *
       FROM backgrounds
      WHERE id_template = $1`,
    [templateId]
  );
  return rows[0] || null;
};

// alias pour compatibilité ancienne appellation
exports.fetchBackgroundByDeceasedId = exports.fetchBackgroundByTemplateId;

/**
 * Crée ou met à jour la personnalisation d’un profil (UPSERT).
 * Nécessite un UNIQUE sur id_template (voir ALTER TABLE ci-dessus).
 */
exports.upsertBackground = async ({
  templateId,
  color_main,
  color_overlay,
  background_url,
  userId = null,          // facultatif : pour tracer l’auteur
}) => {
  const { rows } = await pool.query(
    `INSERT INTO backgrounds (id_template, id_user, background_url, color_main, color_overlay)
         VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (id_template) DO UPDATE
         SET background_url = EXCLUDED.background_url,
             color_main     = EXCLUDED.color_main,
             color_overlay  = EXCLUDED.color_overlay
     RETURNING *`,
    [templateId, userId, background_url, color_main, color_overlay]
  );
  return rows[0];
};
