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
      description // Utilise 'description' au lieu de 'biography'
    } = req.body;
    const user_id = req.user.id;
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }
    const profile = await deceasedModel.insertProfile({
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
  const id = req.params.id;
  const result = await pool.query('SELECT * FROM templates WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Profil non trouvé' });
  }
  res.json(result.rows[0]);
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.user.id

    // Vérifie que le profil appartient bien à l'utilisateur connecté
    const profile = await deceasedModel.fetchProfileById(id)
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' })
    if (profile.id_user !== userId) return res.status(403).json({ error: 'Accès refusé' })

    // Met à jour les champs (à adapter selon ce que tu acceptes)
    const updatedProfile = await deceasedModel.updateProfile(id, req.body)
    res.json(updatedProfile)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Erreur lors de la mise à jour' })
  }
}
