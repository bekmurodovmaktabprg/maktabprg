const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    region: { type: String, required: true },
    district: { type: String, required: true },
    school: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    chatRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ChatRoom' }]
});

module.exports = mongoose.model('User', UserSchema);
