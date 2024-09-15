const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  region: { type: String, required: true },
  district: { type: String, required: true },
  school: { type: String, required: true },
  subject: { type: String, required: true },
  shot: { type: String, required: true },
  premium: { type: Boolean, default: false },
  smsCount: { type: Number, default: 0 },
  profilePic: { type: String } // Profil rasmi
});

module.exports = mongoose.model('Profile', ProfileSchema);
