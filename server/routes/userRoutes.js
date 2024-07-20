const express = require('express');
const path = require('path');
const router = express.Router();
const userController = require('../controllers/userController');

// Serve profile page
router.get('/profile-page', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/profile.html'));
});

// Create or update user profile
router.post('/profile', userController.saveProfile);

// Get user profile
router.get('/profile/:username', userController.getProfile);

module.exports = router;
