const anecdoteModel = require('../models/anecdoteModel');

// Soumission d'une anecdote
exports.submitAnecdote = async (req, res) => {
  try {
    const { content, firstname } = req.body;
    const { id } = req.params; // id du profil (template)
    if (!content || !firstname) {
      return res.status(400).json({ error: 'Prénom et contenu requis' });
    }
    const anecdote = await anecdoteModel.insertAnecdote({ templateId: id, content, firstname });
    res.status(201).json(anecdote);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la soumission de l\'anecdote' });
  }
};

// Liste des anecdotes approuvées
exports.listAnecdotes = async (req, res) => {
  try {
    const { id } = req.params; // id du profil
    const anecdotes = await anecdoteModel.fetchApproved(id);
    res.json(anecdotes);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la récupération des anecdotes' });
  }
};

// Validation d'une anecdote (par l’auteur du profil)
exports.approveAnecdote = async (req, res) => {
  try {
    const { id } = req.params; // id de l’anecdote
    const anecdote = await anecdoteModel.setApproved(id, true);
    res.json(anecdote);
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la validation de l\'anecdote' });
  }
};
