const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const multer = require('multer');
const path = require('path');

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

// Foydalanuvchi ma'lumotlarini olish
router.get('/profile/:id', async (req, res) => {
  
  
  try {
    const profile = await Profile.findById(req.params.id); // Foydalanuvchi ID yoki boshqa parametrlar orqali tanlang
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Foydalanuvchi ma'lumotlarini yangilash (fayl yuklash bilan)
router.put('/profile', upload.single('profilePic'), async (req, res) => {
  try {
    const { name, surname, region, district, school, subject, shot, premium, smsCount } = req.body;
    const updatedProfile = {
      name,
      surname,
      region,
      district,
      school,
      subject,
      shot,
      premium: premium === 'on', // Checkbox uchun
      smsCount: parseInt(smsCount, 10),
      profilePic: req.file ? req.file.path : undefined // Fayl yuklangan bo'lsa
    };

    // Foydalanuvchi ma'lumotlarini yangilash
    const profile = await Profile.findOneAndUpdate({}, updatedProfile, { new: true, upsert: true });
    res.json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
