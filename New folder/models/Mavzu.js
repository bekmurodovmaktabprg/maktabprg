const mongoose = require('mongoose');

const mavzuSchema = new mongoose.Schema({
    nomi: {
        type: String,
        required: true,
    },
    kod: {
        type: String,
        required: true,
        unique: true,
    },
    tavsif: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Mavzu', mavzuSchema);
