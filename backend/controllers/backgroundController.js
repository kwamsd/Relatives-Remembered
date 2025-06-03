const backgroundModel = require('../models/backgroundModel');

exports.setBackground = async (req, res) => {
  try {
    const { id } = req.params; // id du profil
    const { url, colorMain, colorOverlay } = req.body;
    const userId = req.user.id;
    const background = await backgroundModel.insertBackground({ templateId: id, userId, url, colorMain, colorOverlay });
    res.status(201).json(background);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la personnalisation' });
  }
};

exports.getBackground = async (req, res) => {
  try {
    const { id } = req.params;
    const background = await backgroundModel.fetchBackground(id);
    res.json(background);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération' });
  }
};
