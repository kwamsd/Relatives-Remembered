const path             = require('path');
const backgroundModel  = require('../models/backgroundModel');
const deceasedModel    = require('../models/deceasedModel');
const supabase         = require('../supabaseClient');

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
    const userId     = req.user.id;

    // 1) On vérifie d’abord si le profil existe et si l’utilisateur a le droit
    const profile = await deceasedModel.fetchProfileById(templateId);
    if (!profile) return res.status(404).json({ error: 'Profil non trouvé' });
    if (profile.id_user !== userId)
      return res.status(403).json({ error: 'Accès refusé' });

    // 2) Couleurs (venant du body)
    const { color_main, color_overlay } = req.body;

    // 3) Traitement du fichier si présent
    let background_url = null;
    if (req.file) {
      const filename = `background_${Date.now()}_${Math.round(Math.random()*1e6)}${path.extname(req.file.originalname)}`;

      const { data, error: uploadError } = await supabase
        .storage
        .from('uploads')
        .upload(`images/${filename}`, req.file.buffer, {
          contentType: req.file.mimetype
        });
      if (uploadError) {
        console.error('Erreur upload Supabase (background) :', uploadError);
        return res.status(500).json({ error: 'Impossible de stocker l’image de fond' });
      }
      const { publicUrl, error: urlError } = supabase
        .storage
        .from('uploads')
        .getPublicUrl(data.path);
      if (urlError) {
        console.error('Erreur getPublicUrl (background) :', urlError);
        return res.status(500).json({ error: 'Impossible de générer l’URL du background' });
      }
      background_url = publicUrl;
    }

    // 4) On appelle le modèle pour insérer ou mettre à jour
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