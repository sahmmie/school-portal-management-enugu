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

const galleryController = {

    createGallery: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    deleteGallery: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    editGallery: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },

    getGalleries: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    },
    getGalleryById: async(req, res) => {
        try {

        } catch (error) {
            return serverResponse(res, error.message, 400);
        }
    }
}

export default galleryController;