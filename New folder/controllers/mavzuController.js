const Mavzu = require('../models/Mavzu');

// Mavzu yaratish
exports.createMavzu = async (req, res) => {
    try {
        const { nomi, kod, tavsif } = req.body;
        const newMavzu = new Mavzu({ nomi, kod, tavsif });
        const savedMavzu = await newMavzu.save();
        res.status(201).json(savedMavzu);
    } catch (error) {
        res.status(500).json({ message: 'Mavzu yaratishda xatolik yuz berdi', error });
    }
};

// Mavzularni o'qish
exports.getMavzular = async (req, res) => {
    try {
        const mavzular = await Mavzu.find();
        res.status(200).json(mavzular);
    } catch (error) {
        res.status(500).json({ message: 'Mavzularni olishda xatolik yuz berdi', error });
    }
};

// Bitta mavzuni o'qish
exports.getMavzuById = async (req, res) => {
    try {
        const mavzu = await Mavzu.findById(req.params.id);
        if (!mavzu) {
            return res.status(404).json({ message: 'Mavzu topilmadi' });
        }
        res.status(200).json(mavzu);
    } catch (error) {
        res.status(500).json({ message: 'Mavzuni olishda xatolik yuz berdi', error });
    }
};

// Mavzuni yangilash
exports.updateMavzu = async (req, res) => {
    try {
        const { nomi, kod, tavsif } = req.body;
        const updatedMavzu = await Mavzu.findByIdAndUpdate(req.params.id, { nomi, kod, tavsif }, { new: true });
        if (!updatedMavzu) {
            return res.status(404).json({ message: 'Mavzu topilmadi' });
        }
        res.status(200).json(updatedMavzu);
    } catch (error) {
        res.status(500).json({ message: 'Mavzuni yangilashda xatolik yuz berdi', error });
    }
};

// Mavzuni o'chirish
exports.deleteMavzu = async (req, res) => {
    try {
        const deletedMavzu = await Mavzu.findByIdAndDelete(req.params.id);
        if (!deletedMavzu) {
            return res.status(404).json({ message: 'Mavzu topilmadi' });
        }
        res.status(200).json({ message: 'Mavzu o\'chirildi' });
    } catch (error) {
        res.status(500).json({ message: 'Mavzuni o\'chirishda xatolik yuz berdi', error });
    }
};
