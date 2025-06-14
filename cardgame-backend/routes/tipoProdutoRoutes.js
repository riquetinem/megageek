const express = require('express');
const router = express.Router();
const tipoProdutoController = require('../controllers/tipoProdutoController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.post('/', tipoProdutoController.create);
router.put('/:id', tipoProdutoController.update);
router.delete('/:id', tipoProdutoController.remove);
router.get('/', tipoProdutoController.getAll);
router.get('/:id', tipoProdutoController.getById);

module.exports = router;
