import PDFDocument from 'pdfkit';
import fs from 'fs';
import { uniqueId } from "../../utils/validate/validate.js";


async function generatePDF(request) {
    console.log(request.file);
    console.log(request.body);
    const namePDF = uniqueId()
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream(`./public/uploads/${namePDF}.pdf`));

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
