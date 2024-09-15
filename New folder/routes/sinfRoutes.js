const express = require('express');
const { createSinf, getSinflar, getSinfById, updateSinf, deleteSinf } = require('../controllers/sinfController');

const router = express.Router();

// Sinf CRUD marshrutlari
router.post('/sinflar', createSinf);
router.get('/sinflar', getSinflar);
router.get('/sinflar/:id', getSinfById);
router.put('/sinflar/:id', updateSinf);
router.delete('/sinflar/:id', deleteSinf);

module.exports = router;
