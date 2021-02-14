import express from "express";
import loaders from "./loaders/index";
import socketIo from "socket.io";
const startServer = async() => {
    const app = express();
    const { PORT } = process.env;

    let server = app.listen(PORT, (err) => {
        if (err) throw new Error(err);
        console.log(`Server is running on http://localhost:${PORT}`);
    });

    const io = socketIo(server)
    await loaders(app, io);

};

startServer();