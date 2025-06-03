const pool = require('../db')

// … autres exports

exports.getDeceasedByUserId = async (userId) => {
  const { rows } = await pool.query(
    `SELECT id, lastname, firstname
       FROM deceased
       WHERE created_by = $1
       ORDER BY created_at DESC`,
    [userId]
  )
  return rows
}
