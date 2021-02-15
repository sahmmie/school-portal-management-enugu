import {
    Router
} from 'express';
import classController from '../../controllers/class';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/classes', route);

    route.post('/create', classController.createClass);

    route.post('/delete/:id', classController.deleteClass);

    route.post('/edit/:id', upload.any(), classController.editClass);

    route.post('/:class', classController.getClassByClass);

};