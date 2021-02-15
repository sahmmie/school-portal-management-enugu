import {
    Router
} from 'express';
import paymentController from '../../controllers/payment';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/payments', route);

    route.post('/signup', paymentController.makePayment);

    route.post('/:ref', paymentController.getPaymentByRef);

    route.post('', upload.any(), paymentController.getPayments);

    route.post('/:ref', paymentController.verifyPayment);

};