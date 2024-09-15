const ChatRoom = require('./models/ChatRoom');
const User = require('./models/User');

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('New client connected');
        
        socket.on('joinRoom', async ({ roomId, userId }) => {
            socket.join(roomId);
            const user = await User.findById(userId);
            socket.to(roomId).emit('message', { message: `${user.firstName} has joined the chat` });
        });

        socket.on('chatMessage', async ({ roomId, userId, message }) => {
            const newMessage = {
                sender: userId,
                message,
                timestamp: new Date()
            };
            const chatRoom = await ChatRoom.findById(roomId);
            chatRoom.message.push(newMessage);
            await chatRoom.save();
            io.to(roomId).emit('message', newMessage);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
