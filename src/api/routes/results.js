import {
    Router
} from 'express';
import resultController from '../../controllers/result';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/results', route);

    route.post('/upload', resultController.uploadResult);

    route.post('', resultController.getResults);

    route.post('/:regno', resultController.getResultByStudentRegno);

};