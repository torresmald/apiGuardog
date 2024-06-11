import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from "url";

export const createPDF = async (name) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const outputPath = path.resolve(__dirname, `../../tmp/${name}.pdf`);

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        doc
            .fontSize(27)
            .text('Factura Guardog', 100, 100);

        // doc.image('./logo.jpg', {
        //     fit: [300, 300],
        //     align: 'center',
        //     valign: 'center'
        // });

        doc.end();

        stream.on('finish', () => {
            resolve(outputPath);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};



export const deletePDF = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
};
