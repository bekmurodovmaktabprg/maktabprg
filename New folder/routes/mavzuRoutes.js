const express = require('express');
const { createMavzu, getMavzular, getMavzuById, updateMavzu, deleteMavzu } = require('../controllers/mavzuController');

const router = express.Router();

// Mavzu CRUD marshrutlari
router.post('/', createMavzu);
router.get('/', getMavzular);
router.get('/:id', getMavzuById);
router.put('/:id', updateMavzu);
router.delete('/:id', deleteMavzu);

module.exports = router;
