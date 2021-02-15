import {
    Router
} from 'express';
import lesson_noteController from '../../controllers/lesson_note';
import upload from '../../services/multerService';
import staffAuths from '../middleware/staffAuths';

const route = Router();
export default (app) => {
    app.use('/lesson_note', route);

    route.post('/create', lesson_noteController.createNote);

    route.post('/delete/:id', lesson_noteController.deleteNote);

    route.post('/edit/:id', upload.any(), lesson_noteController.editNote);

    route.post('/:id', lesson_noteController.getNotesById);

    route.post('', staffAuths.auth, staffAuths.permit('admin'), lesson_noteController.getNotes);

    route.get('/approve/:id', staffAuths.auth, lesson_noteController.approveNote);

    route.get('/submit_note/:id', staffAuths.auth, lesson_noteController.submitNote);

};