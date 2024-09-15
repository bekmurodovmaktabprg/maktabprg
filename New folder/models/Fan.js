const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FanSchema = new Schema({
  nom: { type: String, required: true }
});

module.exports = mongoose.model('Fan', FanSchema);
