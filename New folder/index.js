const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');
const multer = require('multer'); // Multer uchun import
const path = require('path');
const jwt = require('jsonwebtoken'); // JWT uchun import

const authRoutes = require('./routes/auth');
const testRoutes = require('./routes/testRoutes');
const fanRoutes = require('./routes/fan');
const mavzuRoutes = require('./routes/mavzuRoutes');
const sinfRoutes = require('./routes/sinfRoutes');
const profileRoutes = require('./routes/profileRoutes');
const lessonProductRoutes = require('./routes/lessonProductRoutes');
const socketHandler = require('./socket');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// HTTP serverni yarating
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
  }
});

// Socket Handler'ni ishga tushirish
socketHandler(io);

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// MongoDB'ga ulanish
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB ulanishida xatolik:', err));

// Multer konfiguratsiyasi
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf|pptx/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Only images, PDFs, and PPTX files are allowed!');
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB fayl hajmi limiti
  fileFilter: fileFilter
});

// Fayl yuklash uchun yo'lakcha
app.post('/upload', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdfFile', maxCount: 1 },
  { name: 'pptxFile', maxCount: 1 }
]), (req, res) => {
  try {
    res.send('Files uploaded successfully');
  } catch (error) {
    res.status(400).json({ error: 'File upload error: ' + error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tests', testRoutes);
app.use('/api', profileRoutes);
app.use('/api/fan', fanRoutes);
app.use('/api', sinfRoutes);
app.use('/api/mavzular', mavzuRoutes);
app.use('/api/lessonproducts', lessonProductRoutes);

// Serverni ishga tushirish
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
