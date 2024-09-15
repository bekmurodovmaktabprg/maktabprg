const express = require('express');
const router = express.Router();
const multer = require('multer');
const Test = require('../models/Test');

// Faylni yuklash uchun sozlamalar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Test yaratish (fayl yuklash bilan)
router.post('/', upload.fields([{ name: 'questionFile' }, { name: 'optionFiles' }]), async (req, res) => {
  console.log('Request body:', req.body);
  console.log('Request files:', req.files);


  const { class: testClass, chapter, topic, questions } = req.body;
console.log(questions);
  try {
    // JSON.parse ishlatilishi mumkin bo'lgan formatni tekshirish
    let parsedQuestions=questions
    // try {
    //   parsedQuestions = JSON.parse(questions);
    // } catch (error) {
    //   return res.status(400).json({ message: 'Invalid JSON format for questions' });
    // }

    const newTest = new Test({
      class: testClass,
      chapter,
      topic,
      questions: parsedQuestions.map((question, index) => ({
        ...question,
        questionFile: req.files['questionFile']?.[index]?.path,
        options: question.options.map((option, optIndex) => ({
          ...option,
          optionFile: req.files['optionFiles']?.[index * question.options.length + optIndex]?.path
        }))
      }))
    });

    const savedTest = await newTest.save();
    res.status(201).json(savedTest);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// Barcha testlarni olish
router.get('/', async (req, res) => {
  try {
    const tests = await Test.find();
    res.json(tests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ma'lum bir testni ID orqali olish
router.get('/:id', async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    res.json(test);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Testni yangilash (fayl yuklash bilan)
router.put('/:id', upload.fields([{ name: 'questionFile' }, { name: 'optionFiles' }]), async (req, res) => {
  try {
    const { questions } = req.body;
    
    // `questions` JSON formatida ekanligini tekshirish
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid JSON format for questions' });
    }

    const updatedTest = await Test.findByIdAndUpdate(req.params.id, {
      ...req.body,
      questions: parsedQuestions.map((question, index) => ({
        ...question,
        questionFile: req.files['questionFile']?.[index]?.path,
        options: question.options.map((option, optIndex) => ({
          ...option,
          optionFile: req.files['optionFiles']?.[index * question.options.length + optIndex]?.path
        }))
      }))
    }, { new: true });

    res.json(updatedTest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Testni o'chirish
router.delete('/:id', async (req, res) => {
  try {
    await Test.findByIdAndDelete(req.params.id);
    res.json({ message: 'Test deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
