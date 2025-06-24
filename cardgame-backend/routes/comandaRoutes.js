const express = require('express');
const router = express.Router();
const comandaController = require('../controllers/comandaController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.use(authenticateToken);

router.get('/', comandaController.getAll);
router.get('/:id', comandaController.getById);
router.post('/', comandaController.create);
router.put('/:id/fechar', comandaController.close);
router.get('/todas/hoje', comandaController.getComandasDoDia);
router.get('/todas/filtradas', comandaController.getComandasFiltradas);

module.exports = router;