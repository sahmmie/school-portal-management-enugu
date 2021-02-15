import {
    Router
} from 'express';
import studentController from '../../controllers/student';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/students', route);

    route.post('/create', studentController.createStudent);

    route.post('/delete/:id', studentController.deleteStudent);

    route.post('/edit/:id', upload.any(), studentController.editStudent);

    route.post('/:id', studentController.getStudentById);

    route.post('', staffAuths.auth, staffAuths.permit('admin'), studentController.getStudents);

    route.get('/reset', staffAuths.auth, studentController.promoteStudents);

    route.get('/login', staffAuths.auth, studentController.loginStudent);

};