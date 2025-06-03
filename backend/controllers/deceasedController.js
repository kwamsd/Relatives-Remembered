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
const deceasedModel = require('../models/deceasedModel');

// Créer un profil (POST /deceased)
exports.createProfile = async (req, res) => {
  try {
    const { firstname, lastname, birth, death, biography, theme } = req.body;
    const user_id = req.user.id;
    let photo_url = null;
    if (req.file) {
      photo_url = `/uploads/${req.file.filename}`; // Chemin public à servir
    }
    const profile = await deceasedModel.insertProfile({
      firstname,
      lastname,
      birth,
      death,
      biography,
      photo_url,
      theme,
      user_id
    });
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la création du profil' });
  }
};

// Liste paginée (GET /deceased)
exports.getAllProfiles = async (req, res) => {
  try {
    const { page, limit, minAge } = req.query;
    const profiles = await deceasedModel.fetchProfiles({ page, limit, minAge });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des profils' });
  }
};

// Profil complet (GET /deceased/:id)
exports.getProfileById = async (req, res) => {
  try {
    const profile = await deceasedModel.fetchProfileById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération du profil' });
  }
};
