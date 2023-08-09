import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    return (null, `${Date.now()} - ${file.originalname}`)
  }
})
const uploadPicture = multer({
  storage: storage,
  limits: {
    fileSize: 1 * 1000000
  },
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error("only images are allowes"))
    }
  }
})

export { uploadPicture }