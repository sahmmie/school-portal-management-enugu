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

const studentController = {
    createStudent: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },
    getStudents: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getStudentById: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    promoteStudents: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    editStudent: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    deleteStudent: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },


    loginStudent: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },
}

export default studentController;