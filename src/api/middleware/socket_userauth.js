import jwt from 'jsonwebtoken';
import Staff from '../../models/Staff';
import config from '../../config/index';
import { Server } from 'socket.io';
/**
 *
 * @param {Server} io
 */
const socketUserAuth = async(io) => {
    try {
        io.use(async(socket, next) => {
            try {
                let token = socket.handshake.query.token;
                if (token) {
                    const decoded = jwt.verify(token, config.secretOrKey);
                    const user = await Staff.findOne({
                        _id: decoded._id,
                        'tokens.token': token,
                    })
                    if (!user) throw new Error();
                    socket.token = token;
                    user.isOnline = true;
                    user.socketId = socket.id;
                    socket.user = user;
                    await user.save();
                    return next();
                }
                throw Error('No auth, Please login and try again');
            } catch (error) {
                console.log(error.message);
                socket.disconnect(true);
            }
        });
    } catch (error) {
        throw error;
    }
};

export default socketUserAuth;