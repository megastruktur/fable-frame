// socketIoHandler.js
import { Server } from 'socket.io';

export default function injectSocketIO(server) {
    const io = new Server(server, {
        cors: {
            origin: "https://fable-frame.online",
            methods: ["GET", "POST"],
        }
    });

    io.on('connection', (socket) => {

        socket.on("create", (room) => {
            socket.join(room);
        })

        socket.on('campaignChat', (message) => {
            io.to('campaign-chat-room-' + message.campaignId).emit('campaignChatMessage', {
                characterName: message.characterName,
                message: message.message,
                messageId: message.messageId,
                creatorId: message.creatorId,
                campaignId: message.campaignId,
                time: new Date().toLocaleString()
            });
        });
    });

    console.log('SocketIO injected');
}
