// webSocketPluginVite.js 
import injectSocketIO from './socketIoHandler.js';

export const webSocketServer = {
    name: 'ffWSS',
    configureServer(server) {
        injectSocketIO(server.httpServer);
    }
};
