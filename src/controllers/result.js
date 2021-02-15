import LoggerInstance from '../loaders/logger';
// import avatar from 'gravatar';
import functions from '../utils/functions';
import ErrorHandler from '../helpers/errHandler';
import SuccessHandler from '../helpers/sucessHandler';
import emailService from '../services/emailService';
import emailTemplate from '../helpers/emailTemplate';
import s3_uploads from '../services/awsService';

const {
    successWithMessage,
    successWithData,
    successWithMessageAndData,
} = SuccessHandler;
const {
    serverResponse,
    validationError
} = ErrorHandler;

const resultController = {

    uploadResult: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getResults: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getResultByStudentRegno: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    }
}

export default resultController;