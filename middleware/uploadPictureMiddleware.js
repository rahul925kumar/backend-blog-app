import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('file: ', file);
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + '-' + file.originalname);
  }
});

export const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      cb(new Error("only images are allowed"), false)
    }
    cb(null, true)
  }
})