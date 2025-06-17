const express = require('express');
const router = express.Router();
const comandaController = require('../controllers/comandaController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.get('/', comandaController.getAll);
router.get('/:id', comandaController.getById);
router.post('/', comandaController.create);
router.put('/:id/fechar', authenticateToken, comandaController.close);

module.exports = router;