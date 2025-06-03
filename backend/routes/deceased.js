const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { getDeceasedByUser } = require('../controllers/deceasedController')
const deceasedController = require('../controllers/deceasedController');
const { protect } = require('../middlewares/authMiddleware');
const multer = require('multer');
const path = require('path');

// Configure Multer pour stocker les fichiers dans /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Crée ce dossier à la racine du projet si besoin
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueName + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST /api/deceased (avec fichier)
router.post('/', protect, upload.single('photo'), deceasedController.createProfile);

router.get('/', deceasedController.getAllProfiles);
router.get('/:id', deceasedController.getProfileById);


router.get('/mine', protect, getDeceasedByUser)

module.exports = router;
