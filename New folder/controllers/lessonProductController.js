const LessonProduct = require('../models/LessonProduct');
const path = require('path');
const fs = require('fs');

// Yangi lesson product yaratish
exports.createLessonProduct = async (req, res) => {
  try {
    const newLessonProduct = new LessonProduct(req.body);
    const savedLessonProduct = await newLessonProduct.save();
    res.status(201).json(savedLessonProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lesson Product yaratishda xatolik', error });
  }
};

// Barcha lesson productlarni olish
exports.getLessonProducts = async (req, res) => {
  try {
    const lessonProducts = await LessonProduct.find().populate('sinf fan mavzu');
    res.status(200).json(lessonProducts);
  } catch (error) {
    res.status(500).json({ message: 'Lesson Productlarni olishda xatolik', error });
  }
};

// Bitta lesson productni olish
exports.getLessonProductById = async (req, res) => {
  try {
    const lessonProduct = await LessonProduct.findById(req.params.id).populate('sinf fan mavzu');
    if (!lessonProduct) {
      return res.status(404).json({ message: 'Lesson Product topilmadi' });
    }
    res.status(200).json(lessonProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lesson Productni olishda xatolik', error });
  }
};

// Lesson productni yangilash
exports.updateLessonProduct = async (req, res) => {
  try {
    const updatedLessonProduct = await LessonProduct.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLessonProduct) {
      return res.status(404).json({ message: 'Lesson Product topilmadi' });
    }
    res.status(200).json(updatedLessonProduct);
  } catch (error) {
    res.status(500).json({ message: 'Lesson Productni yangilashda xatolik', error });
  }
};

// Lesson productni o'chirish
exports.deleteLessonProduct = async (req, res) => {
  try {
    const deletedLessonProduct = await LessonProduct.findByIdAndDelete(req.params.id);
    if (!deletedLessonProduct) {
      return res.status(404).json({ message: 'Lesson Product topilmadi' });
    }

    // Fayllarni o'chirish
    const files = [
      deletedLessonProduct.wordFile,
      deletedLessonProduct.excelFile,
      deletedLessonProduct.pdfFile,
      deletedLessonProduct.pptxFile,
      deletedLessonProduct.image,
      deletedLessonProduct.video
    ];

    files.forEach(file => {
      if (file) {
        fs.unlink(path.join(__dirname, '../uploads', path.basename(file)), err => {
          if (err) console.error('Fayl o\'chirishda xatolik:', err);
        });
      }
    });

    res.status(200).json({ message: 'Lesson Product o\'chirildi' });
  } catch (error) {
    res.status(500).json({ message: 'Lesson Productni o\'chirishda xatolik', error });
  }
};

// Fayllarni yuklash
exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'Fayl tanlanmagan' });
    }
    res.status(200).json({ filePath: file.path });
  } catch (error) {
    res.status(500).json({ message: 'Faylni yuklashda xatolik', error });
  }
};
