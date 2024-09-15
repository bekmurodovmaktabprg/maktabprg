const express = require('express');
const router = express.Router();
const fanController = require('../controllers/fanController');

router.post('/', fanController.createFan);
router.get('/', fanController.getAllFanlar);
router.get('/:id', fanController.getFanById);
router.put('/:id', fanController.updateFan);
router.delete('/:id', fanController.deleteFan);

module.exports = router;
