const express = require('express');
const router = express.Router();
const anecdoteController = require('../controllers/anecdoteController');
const { protect } = require('../middlewares/authMiddleware');

// Soumission d'une anecdote (par un visiteur)
router.post('/deceased/:id/anecdotes', anecdoteController.submitAnecdote);

// Liste des anecdotes approuvées pour un profil
router.get('/deceased/:id/anecdotes', anecdoteController.listAnecdotes);

// Validation d'une anecdote (par l’auteur du profil, protégé)
router.put('/anecdotes/:id/approve', protect, anecdoteController.approveAnecdote);

module.exports = router;
