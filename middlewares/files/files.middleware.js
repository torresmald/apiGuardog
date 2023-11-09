import multer from "multer";
import path from 'path'
import createError from "../../utils/errors/createError.js";
import { fileURLToPath } from "url";

const VALID_FILES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileFilter = (request, file, callback) => {
    if (!VALID_FILES.includes(file.mimetype)) {
        return callback(createError('El tipo de archivo no es aceptado', 403))
    } else {
        callback(null, true)
    }
}

const storage = multer.diskStorage({
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname)
    },
    destination: (request, file, callback) => {
        callback(null,  path.join(__dirname, '../../public/uploads'))
    }
})

const uploadFile = multer({storage, fileFilter})

export default uploadFile