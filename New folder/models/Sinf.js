const mongoose = require('mongoose');

const sinfSchema = new mongoose.Schema({
    nomi: {
        type: String,
        required: true,
    },
    raqami: {
        type: Number,
        required: true,
        unique: true,
    },
    oqituvchi: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Sinf', sinfSchema);
