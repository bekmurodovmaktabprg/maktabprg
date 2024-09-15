const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  telNumber: { type: String, required: true },
  science: { type: String, required: true },
  school: { type: String, required: true },
  class: { type: String, required: true },
  region: { type: String, required: true },
  district: { type: String, required: true },
  local: { type: String, required: true },
});

module.exports = mongoose.model('Setting', settingSchema);
