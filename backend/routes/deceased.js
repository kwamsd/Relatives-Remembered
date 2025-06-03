const express = require('express')
const router = express.Router()
const { protect } = require('../middlewares/authMiddleware')
const { getDeceasedByUser } = require('../controllers/deceasedController')

// … routes existantes

router.get('/mine', protect, getDeceasedByUser)

module.exports = router
