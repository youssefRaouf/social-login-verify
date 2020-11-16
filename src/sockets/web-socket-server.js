import socket from 'socket.io';
import WebSocketHandler from './web-socket-handler';
import {verifyJWT, signJWT, IJWTPayload} from '../utils/token';

export default class WebSocketsServers {
  constructor(server) {
    const io = socket(server, {transports: ['websocket']});
    // io.adapter(redis(getRedisConfig()));
    WebSocketHandler.io = io;
    io.use(async (socket, next) => {
      try {
        const {uid} = verifyJWT(socket.handshake.query.token);
        socket.userId = uid;
        next();
      } catch (error) {
        next(error);
      }
    }).on('connection', socket => {
      new WebSocketHandler(
        socket,
        io,
        socket.userId,
        socket.userType
      );
    });
  }
}
