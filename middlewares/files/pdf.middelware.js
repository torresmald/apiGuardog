import PDFDocument from 'pdfkit';
import fs from 'fs';

async function generatePDF(request, fileName) {
    console.log(request.file);
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(`./public/uploads/${request.file.originalname}.pdf`));

    doc
        .fontSize(27)
        .text(request.body.name, 100, 100);
    // doc
    //     .fontSize(50)
    //     .text(content.birthday, 100, 100);
    doc.image(`./public/uploads/${request.file.filename}`, {
        fit: [300, 300],
        align: 'center',
        valign: 'center'
    });

    doc.end();
}


export default generatePDF;
