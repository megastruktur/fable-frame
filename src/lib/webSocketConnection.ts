import ioClient from 'socket.io-client';
import { env } from '$env/dynamic/public';
const socket = ioClient(env.PUBLIC_SOCKETIO_URL);

export const io = socket;
