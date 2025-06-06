const path = require('path');
const deceasedModel = require('../models/deceasedModel');
const supabase      = require('../supabaseClient');

/* POST /api/deceased (protected) */
exports.createProfile = async (req, res) => {
  try {
    const {
      firstname, lastname, second_name, third_name,
      birth, death, job, nationality, gender, description,
    } = req.body;

    let image_url = null;
    if (req.file) {
      // 1) Générer un nom unique pour l’objet dans le bucket
      const filename = `deceased_${Date.now()}_${Math.round(Math.random()*1e6)}${path.extname(req.file.originalname)}`;
      // 2) Upload du buffer dans Supabase Storage (bucket "uploads")
      const { data, error: uploadError } = await supabase
        .storage
        .from('uploads')
        .upload(`images/${filename}`, req.file.buffer, {
          contentType: req.file.mimetype
        });
      if (uploadError) {
        console.error('Erreur upload Supabase :', uploadError);
        return res.status(500).json({ error: 'Impossible de stocker l’image' });
      }
      // 3) Récupérer l’URL publique
      const { publicUrl, error: urlError } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(data.path);
      if (urlError) {
        console.error('Erreur getPublicUrl :', urlError);
        return res.status(500).json({ error: 'Impossible de générer l’URL de l’image' });
      }
      image_url = publicUrl;
    }

    // 4) Insertion du profil avec l’URL complète vers Supabase
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
    const id     = Number(req.params.id);
    const userId = req.user.id;

    const profile = await deceasedModel.fetchProfileById(id);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    if (profile.id_user !== userId)
      return res.status(403).json({ error: 'Accès refusé' });

    // 1) Par défaut, on garde l’ancienne URL si pas de nouveau fichier
    let image_url = profile.image_url;

    // 2) Si l’utilisateur a envoyé un fichier, on upload sur Supabase et on met à jour l’URL
    if (req.file) {
      const filename = `deceased_${Date.now()}_${Math.round(Math.random()*1e6)}${path.extname(req.file.originalname)}`;

      const { data, error: uploadError } = await supabase
        .storage
        .from('uploads')
        .upload(`images/${filename}`, req.file.buffer, {
          contentType: req.file.mimetype
        });
      if (uploadError) {
        console.error('Erreur upload Supabase :', uploadError);
        return res.status(500).json({ error: 'Impossible de stocker l’image' });
      }
      const { publicUrl, error: urlError } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(data.path);
      if (urlError) {
        console.error('Erreur getPublicUrl :', urlError);
        return res.status(500).json({ error: 'Impossible de générer l’URL de l’image' });
      }
      image_url = publicUrl;
    }

    // 3) On fusionne le body et la nouvelle image_url
    const dataToUpdate = {
      ...req.body,
      image_url,
    };

    const updated = await deceasedModel.updateProfile(id, dataToUpdate);
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
