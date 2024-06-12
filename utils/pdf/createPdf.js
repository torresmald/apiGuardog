import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPDF = (appointment, filePath) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        const startX = 100; // Posición X inicial para el texto
        const startY = 50; // Posición Y inicial
        const imageWidth = 100; // Ancho de la imagen
        const imageX = 400; // Posición X para la imagen

        const imagePath = path.resolve(__dirname, './logo.jpeg');

        // Añadir imagen
        doc.image(imagePath, imageX, startY, { width: imageWidth });

        
        const textX = startX;
        doc.fontSize(27).text('Factura Guardog', textX, startY + (imageWidth / 2) - 16); // Ajuste para centrar verticalmente el texto con la imagen



        const tableTop = startY + 100; // Posición Y inicial de la tabla
        const itemX = 30;
        const descriptionX = 60;
        const unitCostX = 200;
        const quantityX = 300;
        const IVAX = 350;
        const lineTotalX = 400;

        doc.fontSize(12)
            .text('Item', itemX, tableTop)
            .text('Description', descriptionX, tableTop)
            .text('Unit Cost', unitCostX, tableTop)
            .text('IVA', IVAX, tableTop)
            .text('Quantity', quantityX, tableTop)
            .text('Total', lineTotalX, tableTop);

 

        let yPosition = tableTop + 20;

        appointment.services.forEach(item => {
            doc.text(1, itemX, yPosition)
                .text(item.name, descriptionX, yPosition)
                .text(item.price, unitCostX, yPosition)
                .text(1, quantityX, yPosition)
                .text(item.price, lineTotalX, yPosition);
            yPosition += 40; // Incrementar posición Y para la siguiente fila
        });



        doc.fontSize(12)
        .text('Subtotal', quantityX, yPosition + 20)
        .text('IVA', quantityX,  yPosition + 30)
        .text('Total', quantityX,  yPosition + 40);


        doc.fontSize(12)
        .text(appointment.totalPaid, lineTotalX, yPosition + 20)
        .text('21%', lineTotalX,  yPosition + 30)
        .text(appointment.totalPaidReal, lineTotalX,  yPosition + 40);


        doc.end();

        stream.on('finish', () => {
            // Verificar tamaño del archivo
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    reject(err);
                } else if (stats.size > 0) {
                    resolve(filePath);
                } else {
                    reject(new Error('El archivo PDF se generó pero está vacío'));
                }
            });
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
