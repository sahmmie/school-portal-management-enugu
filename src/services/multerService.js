import fs from 'fs-extra';
import multer from 'multer';
import Functions from '../utils/functions';
const { fileMimeCategory } = Functions;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (
      fileMimeCategory(file) === 'audios' ||
      fileMimeCategory(file) === 'docs' ||
      fileMimeCategory(file) === 'videos' ||
      fileMimeCategory(file) === 'photos'
    ) {
      fs.mkdirsSync('files');
      cb(null, './files/');
      setTimeout(() => {
        fs.emptyDirSync('files/');
      }, 100000 * 2);
    } else {
      cb({ message: 'Unsupported file format' }, false);
    }
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

export default upload;
