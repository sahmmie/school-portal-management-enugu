import { Router } from 'express';
import staffs from './routes/staffs';
import classes from './routes/classes';
import galleries from './routes/galleries';
import lesson_notes from './routes/lesson_notes';
import results from './routes/results';
import payments from './routes/payments';
import news from './routes/news';
import students from './routes/students';
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

    staffs(app);
    classes(app);
    galleries(app);
    lesson_notes(app);
    news(app);
    students(app);
    results(app);
    payments(app);
    return app;
};