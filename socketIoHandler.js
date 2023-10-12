// socketIoHandler.js
import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        socket.on('campaignChat', (message) => {
            io.emit('campaignChatMessage', {
                characterName: message.characterName,
                message: message.message,
                messageId: message.messageId,
                time: new Date().toLocaleString()
            });
        });
    });

    console.log('SocketIO injected');
}
