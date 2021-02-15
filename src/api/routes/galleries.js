import {
    Router
} from 'express';
import galleryController from '../../controllers/gallery';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/galleries', route);

    route.post('/create', galleryController.createGallery);

    route.post('/delete/:id', galleryController.deleteGallery);

    route.post('/edit/:id', upload.any(), galleryController.editGallery);

    route.post('/:id', galleryController.getGalleryById);

    route.post('', staffAuths.auth, staffAuths.permit('admin'), galleryController.getGalleries);

};