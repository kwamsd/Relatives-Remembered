const backgroundModel = require('../models/backgroundModel');
const deceasedModel   = require('../models/deceasedModel');

/* GET /api/deceased/:id/background */
exports.getBackground = async (req, res) => {
  try {
    const templateId = Number(req.params.id);
    const bg = await backgroundModel.fetchBackgroundByTemplateId(templateId);
    if (!bg) return res.status(404).json({ error: 'Background not found' });
    res.json(bg);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

/* PUT /api/deceased/:id/background  (protected) */
exports.updateBackground = async (req, res) => {
  try {
    const templateId = Number(req.params.id);
    const userId = req.user.id;

    const profile = await deceasedModel.fetchProfileById(templateId);
    if (!profile)     return res.status(404).json({ error: 'Profil non trouvé' });
    if (profile.id_user !== userId)
      return res.status(403).json({ error: 'Accès refusé' });

    const { color_main, color_overlay } = req.body;
    const background_url = req.file ? `/uploads/${req.file.filename}` : null;

    const updated = await backgroundModel.upsertBackground({
      templateId,
      color_main,
      color_overlay,
      background_url,
      userId,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du background' });
  }
};
