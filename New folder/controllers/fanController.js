const Fan = require('../models/Fan');

// Fan yaratish
exports.createFan = async (req, res) => {
  try {
    const { nom } = req.body;
    const yangiFan = new Fan({ nom });
    await yangiFan.save();
    res.status(201).json(yangiFan);
  } catch (error) {
    res.status(400).json({ message: 'Fan yaratishda xatolik', error });
  }
};

// Barcha fanlarni olish
exports.getAllFanlar = async (req, res) => {
  try {
    const fanlar = await Fan.find();
    res.status(200).json(fanlar);
  } catch (error) {
    res.status(400).json({ message: 'Fanlarni olishda xatolik', error });
  }
};

// Bir fan olish
exports.getFanById = async (req, res) => {
  try {
    const fan = await Fan.findById(req.params.id);
    if (!fan) {
      return res.status(404).json({ message: 'Fan topilmadi' });
    }
    res.status(200).json(fan);
  } catch (error) {
    res.status(400).json({ message: 'Fan olishda xatolik', error });
  }
};

// Fan yangilash
exports.updateFan = async (req, res) => {
  try {
    const { nom } = req.body;
    const fan = await Fan.findByIdAndUpdate(req.params.id, { nom }, { new: true });
    if (!fan) {
      return res.status(404).json({ message: 'Fan topilmadi' });
    }
    res.status(200).json(fan);
  } catch (error) {
    res.status(400).json({ message: 'Fan yangilashda xatolik', error });
  }
};

// Fan o'chirish
exports.deleteFan = async (req, res) => {
  try {
    const fan = await Fan.findByIdAndDelete(req.params.id);
    if (!fan) {
      return res.status(404).json({ message: 'Fan topilmadi' });
    }
    res.status(200).json({ message: 'Fan o\'chirildi' });
  } catch (error) {
    res.status(400).json({ message: 'Fan o\'chirishda xatolik', error });
  }
};
