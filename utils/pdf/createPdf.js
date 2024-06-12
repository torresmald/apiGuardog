import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from "url";
import tmp from 'tmp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const createPDF = async (name) => {
    return new Promise((resolve, reject) => {
        // Crear un archivo temporal
        tmp.file({ postfix: '.pdf' }, (err, tempPath, fd) => {
            if (err) {
                return reject(err);
            }

            const doc = new PDFDocument();
            const stream = fs.createWriteStream(tempPath);
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

            // Datos ficticios de la tabla
            const items = [
                { item: '1', description: 'Producto A', unitCost: '10.00', quantity: '2', lineTotal: '20.00' },
                { item: '2', description: 'Producto B', unitCost: '15.00', quantity: '1', lineTotal: '15.00' },
                { item: '3', description: 'Producto C', unitCost: '7.50', quantity: '3', lineTotal: '22.50' },
                { item: '4', description: 'Producto D', unitCost: '12.00', quantity: '1', lineTotal: '12.00' }
            ];

            let yPosition = tableTop + 20;

            items.forEach(item => {
                doc.text(item.item, itemX, yPosition)
                    .text(item.description, descriptionX, yPosition)
                    .text(item.unitCost, unitCostX, yPosition)
                    .text(item.quantity, quantityX, yPosition)
                    .text(item.lineTotal, lineTotalX, yPosition);
                yPosition += 20; // Incrementar posición Y para la siguiente fila
            });

            // Añadir línea al final del documento
            const bottomLineY = doc.page.height - 100;
            doc.rect(0, bottomLineY, doc.page.width, 100).fill('#f0f0f0');

            // Añadir texto de agradecimiento dentro del rectángulo
            const thankYouText = 'Gracias por su confianza';
            const textXPosition = doc.page.width / 2;
            const textYPosition = bottomLineY + 50;

            doc.fillColor('black')
                .fontSize(20)
                .text(thankYouText, textXPosition, textYPosition, {
                    width: doc.page.width,
                    align: 'center'
                });

            doc.end();

            stream.on('finish', () => {
                resolve(tempPath);
            });

            stream.on('error', (err) => {
                reject(err);
            });
        });
    });
};



// export const createPDF = async (name, appointment) => {
//     console.log(appointment);
//     return new Promise((resolve, reject) => {

//         const doc = new PDFDocument();
//         const outputPath = path.resolve(__dirname, `/var/task/tmp/${name}.pdf`);

//         const stream = fs.createWriteStream(outputPath);
//         doc.pipe(stream);

//         const startX = 100; // Posición X inicial para el texto
//         const startY = 100; // Posición Y inicial
//         const imageWidth = 100; // Ancho de la imagen
//         const imageX = 400; // Posición X para la imagen

//         const imagePath = path.resolve(__dirname, './logo.jpeg');

//         // Añadir imagen
//         doc.image(imagePath, imageX, startY, { width: imageWidth });

//         // Añadir texto
//         const textX = startX;
//         doc.fontSize(27).text('Factura Guardog', textX, startY + (imageWidth / 2) - 13.5); // Ajuste para centrar verticalmente el texto con la imagen

//         // Añadir tabla de datos ficticios de una factura
//         const tableTop = startY + 150; // Posición Y inicial de la tabla
//         const itemX = 20;
//         const descriptionX = startX + 50;
//         const unitCostX = startX + 150;
//         const quantityX = startX + 250;
//         const lineTotalX = startX + 400;

//         // Encabezados de la tabla
//         doc.fontSize(12)
//             .text('Name', itemX, tableTop)
//             .text('Description', descriptionX, tableTop)
//             .text('Unit Cost', unitCostX, tableTop)
//             .text('Quantity', quantityX, tableTop)
//             .text('Total', lineTotalX, tableTop);

//         let yPosition = tableTop + 20;

//         appointment.services.forEach(item => {
//             doc.text(item.name, itemX, yPosition)
//                 .text(item.type, descriptionX, yPosition)
//                 .text(item.price, unitCostX, yPosition)
//                 .text('1', quantityX, yPosition)
//                 .text(item.price, lineTotalX, yPosition);
//             yPosition += 20; // Incrementar posición Y para la siguiente fila
//         });

//         doc.fontSize(14)
//             .text('Subtotal', quantityX, 400)
//             .text('IVA', quantityX, 420)
//             .text('TOTAL', quantityX, 440)
//             .text(appointment.totalPay, lineTotalX, 400)
//             .text('21%', lineTotalX, 420)
//             .text(appointment.totalPaidReal, lineTotalX, 440)


// // LINEA AL FINAL




//         doc.end();

//         stream.on('finish', () => {
//             resolve(outputPath);
//         });

//         stream.on('error', (err) => {
//             reject(err);
//         });
//     });
// };



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