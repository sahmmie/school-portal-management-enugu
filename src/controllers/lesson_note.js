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

const lessonNoteController = {
    createNote: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },
    editNote: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    deleteNote: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    approveNote: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    submitNote: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getNotes: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getNotesById: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },
}

export default lessonNoteController;