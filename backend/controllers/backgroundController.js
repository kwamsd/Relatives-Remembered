const backgroundModel = require('../models/backgroundModel');

// GET /api/deceased/:id/background
exports.getBackground = async (req, res) => {
  try {
    const deceasedId = req.params.id;
    const background = await backgroundModel.fetchBackgroundByDeceasedId(deceasedId);
    if (!background) return res.status(404).json({ error: 'Background not found' });
    res.json(background);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// PUT /api/deceased/:id/background
exports.updateBackground = async (req, res) => {
  try {
    const deceasedId = req.params.id;
    const userId = req.user.id;

    // Vérifie que le défunt appartient bien à l'utilisateur
    const profile = await require('../models/deceasedModel').fetchProfileById(deceasedId);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    if (profile.id_user !== userId) return res.status(403).json({ error: 'Accès refusé' });

    // Récupère les données (couleurs, image)
    const { color_main, color_overlay } = req.body;
    let background_url = null;

    if (req.file) {
      background_url = `/uploads/${req.file.filename}`;
    }

    const updatedBackground = await backgroundModel.upsertBackground({
      id_deceased: deceasedId,
      color_main,
      color_overlay,
      background_url
    });

    res.json(updatedBackground);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du background' });
  }
};
