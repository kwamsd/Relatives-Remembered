const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController.js');
const { protect } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

// Route inscription
router.post('/register', [
    body('lastname').notEmpty(),
    body('firstname').notEmpty(),
    body('mail').isEmail(),
    body('password').isLength({ min: 6 }),
    body('username').notEmpty()
], registerUser);

// Route connexion
router.post('/login', [
    body('mail').isEmail(),
    body('password').notEmpty()
], loginUser);

// Déconnexion
router.post('/logout', logoutUser);

router.get('/me', protect, (req, res) => {
  res.json({ id: req.user.id, mail: req.user.mail, firstname: req.user.firstname })
})


module.exports = router;
