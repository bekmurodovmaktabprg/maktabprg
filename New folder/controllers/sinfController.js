const Sinf = require('../models/Sinf');

// Sinf yaratish
exports.createSinf = async (req, res) => {
    console.log(req.body);
    
    try {
        const { nomi, raqami, oqituvchi } = req.body;
        const newSinf = new Sinf({ nomi, raqami, oqituvchi });
        const savedSinf = await newSinf.save();
        res.status(201).json(savedSinf);
    } catch (error) {
        res.status(500).json({ message: 'Sinf yaratishda xatolik yuz berdi', error });
    }
};

// Sinflarni o'qish
exports.getSinflar = async (req, res) => {
    try {
        const sinflar = await Sinf.find();
        res.status(200).json(sinflar);
    } catch (error) {
        res.status(500).json({ message: 'Sinflarni olishda xatolik yuz berdi', error });
    }
};

// Bitta sinfni o'qish
exports.getSinfById = async (req, res) => {
    try {
        const sinf = await Sinf.findById(req.params.id);
        if (!sinf) {
            return res.status(404).json({ message: 'Sinf topilmadi' });
        }
        res.status(200).json(sinf);
    } catch (error) {
        res.status(500).json({ message: 'Sinfni olishda xatolik yuz berdi', error });
    }
};

// Sinfni yangilash
exports.updateSinf = async (req, res) => {
    try {
        const { nomi, raqami, oqituvchi } = req.body;
        const updatedSinf = await Sinf.findByIdAndUpdate(req.params.id, { nomi, raqami, oqituvchi }, { new: true });
        if (!updatedSinf) {
            return res.status(404).json({ message: 'Sinf topilmadi' });
        }
        res.status(200).json(updatedSinf);
    } catch (error) {
        res.status(500).json({ message: 'Sinfni yangilashda xatolik yuz berdi', error });
    }
};

// Sinfni o'chirish
exports.deleteSinf = async (req, res) => {
    try {
        const deletedSinf = await Sinf.findByIdAndDelete(req.params.id);
        if (!deletedSinf) {
            return res.status(404).json({ message: 'Sinf topilmadi' });
        }
        res.status(200).json({ message: 'Sinf o\'chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Sinfni o\'chirishda xatolik yuz berdi', error });
    }
};
