import multer from "multer";
import path from 'path'
import createError from "../../utils/errors/createError.js";
import { fileURLToPath } from "url";

const VALID_FILES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileFilter = (request, file, cb) => {
    if(!VALID_FILES.includes(file.mimetype)){
        cb(createError('El tipo de archivo no es válido'))
    } else {
        cb(null, true)
    }
};

const storage = multer.diskStorage({
    filename: (request, file, cb) => {
        cb(null, Date.now() + file.originalname )
    },
    destination: (request, file, cb) => {
        cb(null, '/tmp/')
    }
});


const uploadFile = multer({storage, fileFilter})

export default uploadFile