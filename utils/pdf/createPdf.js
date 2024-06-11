import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createPDF = async (name, appointment) => {
    console.log(appointment);
    return new Promise((resolve, reject) => {

        const doc = new PDFDocument();
        const outputPath = path.resolve(__dirname, `/var/task/tmp${name}.pdf`);

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        const startX = 100; // Posición X inicial para el texto
        const startY = 100; // Posición Y inicial
        const imageWidth = 100; // Ancho de la imagen
        const imageX = 400; // Posición X para la imagen

        const imagePath = path.resolve(__dirname, './logo.jpeg');

        // Añadir imagen
        doc.image(imagePath, imageX, startY, { width: imageWidth });

        // Añadir texto
        const textX = startX;
        doc.fontSize(27).text('Factura Guardog', textX, startY + (imageWidth / 2) - 13.5); // Ajuste para centrar verticalmente el texto con la imagen

        // Añadir tabla de datos ficticios de una factura
        const tableTop = startY + 150; // Posición Y inicial de la tabla
        const itemX = 20;
        const descriptionX = startX + 50;
        const unitCostX = startX + 150;
        const quantityX = startX + 250;
        const lineTotalX = startX + 400;

        // Encabezados de la tabla
        doc.fontSize(12)
            .text('Name', itemX, tableTop)
            .text('Description', descriptionX, tableTop)
            .text('Unit Cost', unitCostX, tableTop)
            .text('Quantity', quantityX, tableTop)
            .text('Total', lineTotalX, tableTop);

        let yPosition = tableTop + 20;

        appointment.services.forEach(item => {
            doc.text(item.name, itemX, yPosition)
                .text(item.type, descriptionX, yPosition)
                .text(item.price, unitCostX, yPosition)
                .text('1', quantityX, yPosition)
                .text(item.price, lineTotalX, yPosition);
            yPosition += 20; // Incrementar posición Y para la siguiente fila
        });

        doc.fontSize(14)
            .text('Subtotal', quantityX, 400)
            .text('IVA', quantityX, 420)
            .text('TOTAL', quantityX, 440)
            .text(appointment.totalPay, lineTotalX, 400)
            .text('21%', lineTotalX, 420)
            .text(appointment.totalPaidReal, lineTotalX, 440)


// LINEA AL FINAL




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
