const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  class: { type: String, required: true },
  chapter: { type: String, required: true },
  topic: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      questionFile: { type: String },  // Savolga fayl biriktirish uchun
      options: [
        {
          optionText: { type: String, required: true },
          optionFile: { type: String },  // Variantga fayl biriktirish uchun
        }
      ],
      correctAnswer: { type: String, required: true }
    }
  ]
});

// Variantlar sonini 4 ta bilan cheklash uchun savollar shemasi yangilandi
TestSchema.path('questions').validate(function (questions) {
  return questions.every(q => q.options.length === 4);
}, 'Har bir savolda to\'rtta variant bo\'lishi kerak.');

module.exports = mongoose.model('Test', TestSchema);
