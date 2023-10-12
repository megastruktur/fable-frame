import ioClient from 'socket.io-client';
import { PUBLIC_SOCKETIO_URL } from '$env/static/public';
const socket = ioClient(PUBLIC_SOCKETIO_URL);

export const io = socket;
