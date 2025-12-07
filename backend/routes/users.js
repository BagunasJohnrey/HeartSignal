const express = require('express');
const router = express.Router();
const { updateLocation, getNearbyUsers } = require('../controllers/userController');

router.post('/location', updateLocation);       // Update user location
router.get('/nearby', getNearbyUsers);          // Get nearby users

module.exports = router;
