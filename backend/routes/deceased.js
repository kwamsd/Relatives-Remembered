const express  = require('express');
const router   = express.Router();
const multer   = require('multer');
const path     = require('path');

const { protect }         = require('../middlewares/authMiddleware');
const deceasedController  = require('../controllers/deceasedController');
const backgroundController = require('../controllers/backgroundController');

/* ----- Multer ----- */
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename:    (_, file, cb) =>
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

/* ----- Routes ----- */

// Créer un profil
router.post('/', protect, upload.single('photo'), deceasedController.createProfile);

// Liste + profils propres
router.get('/',            deceasedController.getAllProfiles);
router.get('/mine', protect, deceasedController.getDeceasedByUser);

// Personnalisation background
router.get('/:id/background', backgroundController.getBackground);
router.put('/:id/background',
  protect,
  upload.single('background'),
  backgroundController.updateBackground);

// Profil complet + édition
router.get('/:id', deceasedController.getProfileById);
router.put('/:id',
  protect,
  upload.single('image'),
  deceasedController.updateProfile);

module.exports = router;
