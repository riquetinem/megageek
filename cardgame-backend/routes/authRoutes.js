const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rota de registro (somente administradores/gerentes poderão usar depois)
router.post('/register', authController.register);

// Rota de login
router.post('/login', authController.login);

module.exports = router;
