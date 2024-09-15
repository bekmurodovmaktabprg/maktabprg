const multer = require('multer');
const path = require('path');

// Fayl saqlash konfiguratsiyasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Fayllarni saqlash papkasi
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Fayl nomini yaratish
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
