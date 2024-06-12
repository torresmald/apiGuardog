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
        const startY = 100; // Posición Y inicial
        const imageWidth = 100; // Ancho de la imagen
        const imageX = 400; // Posición X para la imagen

        const imagePath = path.resolve(__dirname, './logo.jpeg');

        // Añadir imagen
        doc.image(imagePath, imageX, startY, { width: imageWidth });

        
        const textX = startX;
        doc.fontSize(27).text('Factura Guardog', textX, startY + (imageWidth / 2) - 13.5); // Ajuste para centrar verticalmente el texto con la imagen



        const tableTop = startY + 150; // Posición Y inicial de la tabla
        const itemX = startX;
        const descriptionX = startX + 150;
        const unitCostX = startX + 300;
        const quantityX = startX + 400;
        const lineTotalX = startX + 500;

        // Encabezados de la tabla
        doc.fontSize(12)
            .text('Item', itemX, tableTop)
            .text('Description', descriptionX, tableTop)
            .text('Unit Cost', unitCostX, tableTop)
            .text('Quantity', quantityX, tableTop)
            .text('Line Total', lineTotalX, tableTop);

 

        let yPosition = tableTop + 20;

        appointment.services.forEach(item => {
            doc.text(item.item, itemX, yPosition)
                .text(item.description, descriptionX, yPosition)
                .text(item.unitCost, unitCostX, yPosition)
                .text(item.quantity, quantityX, yPosition)
                .text(item.lineTotal, lineTotalX, yPosition);
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
