const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomSchema = new Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
    }]
});

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
