/* global SOCKET_HOST */
import io from 'socket.io-client';

const socket = io('https://192.168.0.118:5000', { secure: true});
export default socket;
