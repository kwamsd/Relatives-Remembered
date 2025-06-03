const { getDeceasedByUserId } = require('../models/deceasedModel')

exports.getDeceasedByUser = async (req, res) => {
  try {
    const list = await getDeceasedByUserId(req.user.id)
    res.json(list)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
