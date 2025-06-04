const deceasedModel = require('../models/deceasedModel');

/* POST /api/deceased (protected) */
exports.createProfile = async (req, res) => {
  try {
    const {
      firstname, lastname, second_name, third_name,
      birth, death, job, nationality, gender, description,
    } = req.body;

    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const profile = await deceasedModel.insertProfile({
      firstname, lastname, second_name, third_name,
      birth, death, job, nationality, gender, description,
      image_url,
      user_id: req.user.id,
    });

    res.status(201).json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la création du profil' });
  }
};

/* GET /api/deceased */
exports.getAllProfiles = async (req, res) => {
  try {
    const { page, limit, minAge } = req.query;
    const profiles = await deceasedModel.fetchProfiles({
      page:   Number(page)   || 1,
      limit:  Number(limit)  || 10,
      minAge: minAge ? Number(minAge) : null,
    });
    res.json(profiles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des profils' });
  }
};

/* GET /api/deceased/:id */
exports.getProfileById = async (req, res) => {
  try {
    const profile = await deceasedModel.fetchProfileById(Number(req.params.id));
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

/* PUT /api/deceased/:id (protected) */
exports.updateProfile = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const userId = req.user.id;

    const profile = await deceasedModel.fetchProfileById(id);
    if (!profile)                 return res.status(404).json({ error: 'Profil non trouvé' });
    if (profile.id_user !== userId) return res.status(403).json({ error: 'Accès refusé' });

    const data = {
      ...req.body,
      image_url: req.file ? `/uploads/${req.file.filename}` : profile.image_url,
    };

    const updated = await deceasedModel.updateProfile(id, data);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour' });
  }
};

/* GET /api/deceased/mine (protected) */
exports.getDeceasedByUser = async (req, res) => {
  try {
    const list = await deceasedModel.getDeceasedByUserId(req.user.id);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
