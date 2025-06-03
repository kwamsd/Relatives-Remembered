const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getProfile } = require('../controllers/authController.js');
const { protect } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

// Route inscription
router.post(
  '/register',
  [
    body('lastname').notEmpty(),
    body('firstname').notEmpty(),
    body('mail').isEmail(),
    body('password').isLength({ min: 6 }),
    body('username').notEmpty()
  ],
  registerUser
);

// Route connexion
router.post(
  '/login',
  [
    body('mail').isEmail(),
    body('password').notEmpty()
  ],
  loginUser
);

// Déconnexion
router.post('/logout', logoutUser);

// Récupérer le profil (protected)
router.get('/me', protect, getProfile);

module.exports = router;
