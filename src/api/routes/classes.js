import {
    Router
} from 'express';
import staffController from '../../controllers/staff';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/staffs', route);

    route.post('/signup', staffController.createStaff);

    route.post('/delete/:id', staffController.deleteStaff);

    route.post('/edit/:id', upload.any(), staffController.editStaff);

    route.post('/:id', staffController.getStaffById);

    route.post('', staffAuths.auth, staffAuths.permit('admin'), staffController.getStaffs);

    route.get('/reset', staffAuths.auth, staffController.resetPassword);

};