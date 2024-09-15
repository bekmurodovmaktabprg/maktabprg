const express = require('express');
const multer = require('multer');
const path = require('path');
const LessonProduct = require('../models/LessonProduct');

const router = express.Router();

// Fayllar uchun saqlash sozlamalari
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// CRUD amallari
router.post('/', upload.array('files'), async (req, res) => {
  try {
    // Fayllarni tekshirish
    const files = req.files.map(file => ({
      type: file.mimetype.split('/')[1],
      path: file.path,
      description: req.body[`fileDescription_${file.originalname}`] || ''
    }));

    // YouTube linklarini tekshirish
    const youtubeLinks = req.body.youtube ? req.body.youtube.map((link, index) => ({
      link: link,
      description: req.body.youtubeDescription ? req.body.youtubeDescription[index] || '' : ''
    })) : [];

    // Yangi LessonProduct yaratish
    const lessonProduct = new LessonProduct({
      sinf: req.body.sinf,
      fan: req.body.fan,
      mavzu: req.body.mavzu,
      youtube: youtubeLinks,
      files: files
    });

    await lessonProduct.save();
    res.status(201).json(lessonProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const lessonProducts = await LessonProduct.find();
    res.json(lessonProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lessonProduct = await LessonProduct.findById(req.params.id);
    if (!lessonProduct) return res.status(404).json({ message: 'Topilmadi' });
    res.json(lessonProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', upload.array('files'), async (req, res) => {
  try {
    const lessonProduct = await LessonProduct.findById(req.params.id);
    if (!lessonProduct) return res.status(404).json({ message: 'Topilmadi' });

    lessonProduct.sinf = req.body.sinf || lessonProduct.sinf;
    lessonProduct.fan = req.body.fan || lessonProduct.fan;
    lessonProduct.mavzu = req.body.mavzu || lessonProduct.mavzu;

    if (req.body.youtube) {
      lessonProduct.youtube = req.body.youtube.map((link, index) => ({
        link: link,
        description: req.body.youtubeDescription[index] || ''
      }));
    }

    if (req.files) {
      const files = req.files.map(file => ({
        type: file.mimetype.split('/')[1],
        path: file.path,
        description: req.body[`fileDescription_${file.originalname}`] || ''
      }));
      lessonProduct.files.push(...files);
    }

    await lessonProduct.save();
    res.json(lessonProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const lessonProduct = await LessonProduct.findByIdAndDelete(req.params.id);
    if (!lessonProduct) return res.status(404).json({ message: 'Topilmadi' });
    res.json({ message: 'O\'chirildi' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
