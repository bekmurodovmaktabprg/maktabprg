const mongoose = require('mongoose');

const lessonProductSchema = new mongoose.Schema({
  sinf: { type: String, required: true },
  fan: { type: String, required: true },
  mavzu: { type: String, required: true },
  youtube: [{
    link: { type: String },
    description: { type: String }
  }],
  files: [{
    type: { type: String }, // 'word', 'excel', 'pdf', 'pptx', 'image', 'video'
    path: { type: String },
    description: { type: String }
  }]
});

module.exports = mongoose.model('LessonProduct', lessonProductSchema);
