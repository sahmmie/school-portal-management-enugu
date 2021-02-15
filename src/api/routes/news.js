import {
    Router
} from 'express';
import newsController from '../../controllers/news';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/news', route);

    route.post('/create', newsController.createNews);

    route.post('/delete/:id', newsController.deleteNews);

    route.post('/edit/:id', upload.any(), newsController.editNews);

    route.post('/:id', newsController.getNewsById);

    route.post('', staffAuths.auth, staffAuths.permit('admin'), newsController.getNews);

};