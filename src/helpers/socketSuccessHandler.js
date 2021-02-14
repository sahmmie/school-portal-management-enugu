const socketSuccessHandler = {
    /**
     * 
     * @param {Number} statusCode 
     * @param {String} message 
     */
    socketWithMessage(statusCode, message) {
        return ({ message, status: 'success', code: statusCode });
    },
    /**
     * 
     * @param {Number} statusCode 
     * @param {any} data 
     */
    socketWithData(statusCode, data) {
        return ({ data, status: 'success', code: statusCode });
    },
    /**
     * 
     * @param {Number} statusCode 
     * @param {String} message 
     * @param {any} data 
     */
    socketWithMessageAndData(statusCode, message, data) {
        return ({
            data,
            message,
            status: 'success',
            code: statusCode
        });
    },
};
export default socketSuccessHandler;