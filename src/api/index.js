import { Router } from 'express';
import users from './routes/users';
import socketUserAuth from './middleware/socket_userauth';
import { Server } from 'socket.io';

/**
 *
 * @param {Server} io
 */
export default (io) => {
    const app = Router();

    // temporary log
    socketUserAuth(io);
    io.on('connection', (socket) => {
        console.log(`${socket.id} joined`);

        socket.on('disconnect', async() => {
            // TODO when user disconnects remove from ALL stream and close all lives and also change online state to offline
            console.log(`${socket.user.socketId} disconnected`);
        });
    });

    users(app);

    return app;
};