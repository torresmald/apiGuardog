import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import generatePDF from './pdf.middelware.js';

const uploadToCloud = async (request, response, next) => {
    try {
        if (request.file) {
            //generatePDF(request)
            const filePath = request.file.path;
            const image = await cloudinary.uploader.upload(filePath, {folder: 'Guardog'});
            fs.unlinkSync(filePath);
            request.file = image.secure_url
            return next();
        }
        return next()
    } catch (error) {
        return next(error)
    };
}
export default uploadToCloud
