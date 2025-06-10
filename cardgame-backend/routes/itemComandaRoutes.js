const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemComandaController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.post('/', itemController.addItem);
router.delete('/:id', itemController.removeItem);

module.exports = router;