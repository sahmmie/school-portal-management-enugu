import jwt from 'jsonwebtoken';
import Staff from '../../models/Staff';
import config from '../../config/index';

const staffAuths = {
    auth: async(req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, config.secretOrKey);
            const user = await Staff.findOne({
                _id: decoded._id,
                'tokens.token': token
            });
            if (!user) throw new Error();
            req.token = token;
            req.user = user;
            next();
        } catch (error) {
            // LoggerInstance.error(error);
            res.status(401).send({
                msg: 'Please Authenticate'
            });
        }
    },

    /**
     * 
     * @param  {...any} permittedRoles teacher | accountant | admin
     */
    permit: (...permittedRoles) => {
        // return a middleware
        return (request, response, next) => {
            const {
                user
            } = request

            if (user && permittedRoles.includes(user.role)) {
                next(); // role is allowed, so continue on the next middleware
            } else {
                response.status(403).json({
                    message: "Forbidden"
                }); // user is forbidden
            }
        }
    }
}
export default staffAuths;