const express = require ('express')
const router = express.Router()
const { registerUser, loginUser, getMe, logGuest } = require('../controlers/userControler')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/login/guest', logGuest)
router.get('/me', protect, getMe)

module.exports = router