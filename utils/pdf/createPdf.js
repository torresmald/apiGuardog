import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPDF = (name, appointment, filePath) => {
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
        doc.fontSize(27).text('Factura Guardog', textX, startY + (imageWidth / 2) - 3); // Ajuste para centrar verticalmente el texto con la imagen



        const tableTop = startY + 50; // Posición Y inicial de la tabla
        const itemX = 20;
        const descriptionX = 50;
        const unitCostX = 150;
        const quantityX = 200;
        const lineTotalX = 250;

        // Encabezados de la tabla
        doc.fontSize(12)
            .text('Item', itemX, tableTop)
            .text('Description', descriptionX, tableTop)
            .text('Unit Cost', unitCostX, tableTop)
            .text('Quantity', quantityX, tableTop)
            .text('Line Total', lineTotalX, tableTop);

 

        let yPosition = tableTop + 20;

        appointment.services.forEach(item => {
            doc.text(item.name, itemX, yPosition)
                .text(item.description, descriptionX, yPosition)
                .text(item.price, unitCostX, yPosition)
                .text(1, quantityX, yPosition)
                .text(item.price, lineTotalX, yPosition);
            yPosition += 20; // Incrementar posición Y para la siguiente fila
        });


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
