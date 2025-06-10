const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Proteger todas as rotas abaixo
router.use(authenticateToken);

// Apenas admin ou gerente podem acessar estas rotas
router.get('/', authorizeRoles('admin', 'gerente'), userController.getAllUsers);
router.post('/', authorizeRoles('admin', 'gerente'), userController.createUser);
router.put('/:id/disable', authorizeRoles('admin', 'gerente'), userController.disableUser);

module.exports = router;