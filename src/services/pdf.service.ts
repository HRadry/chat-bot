// services/pdfService.js
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

class PDFService {
    generateReceipt(transactionData) {
        return new Promise((resolve, reject) => {
            // Crear un nuevo documento PDF
            const doc = new PDFDocument({
                size: 'A4',
                margins: { top: 50, left: 50, bottom: 50, right: 50 }
            });

            // Ruta para guardar el archivo PDF
            const filePath = path.join(`../pch-whatsapp/src/receipts/receipt_${transactionData.transferID}.pdf`);
            const file = `receipt_${transactionData.transferID}.pdf`;

            // Crear un flujo de escritura para guardar el PDF
            const writeStream = fs.createWriteStream(filePath);
            doc.pipe(writeStream);

            writeStream.on('finish', () => {
                resolve(file);
            });

            writeStream.on('error', (error) => {
                reject(error);
            });

            // Añadir logo del banco 
            const logoPath = path.join('assets', `${transactionData.bankOrigin}.jpg`);
            doc.image(logoPath, { fit: [50, 50], align: 'center', valign: 'center' });
            doc.moveDown();

            // Añadir título del documento
            doc.fontSize(24).text('Recibo de Transferencia', { align: 'center', underline: true });
            doc.moveDown();

            // Información de la transacción
            doc.fontSize(14).text(`Fecha: ${new Date().toLocaleString()}`, { align: 'left' });
            doc.moveDown();
            doc.fontSize(12).text(`ID de Transferencia: ${transactionData.transferID}`);
            doc.text(`Ordenante: ${transactionData.senderName}`);
            doc.text(`Banco origen: ${transactionData.bankOrigin}`);
            doc.text(`Monto: ${transactionData.amount} MXN`);
            doc.moveDown();
            doc.text(`Destinatario: ${transactionData.receiverName}`);
            doc.text(`Banco destino: ${transactionData.bankDestination}`);
            doc.text(`Cuenta destino: ${transactionData.accountDestination}`);
            doc.moveDown();
            doc.text(`Comisión: $${transactionData.fee} MXN`);
            doc.text(`Total: $${transactionData.total} MXN`);
            doc.moveDown();
            doc.text(`Nota: ${transactionData.note}`, { align: 'left' });
            doc.moveDown();

            // Añadir una línea separadora
            doc.moveTo(50, doc.y)
                .lineTo(550, doc.y)
                .strokeColor('#000000')
                .stroke();

            doc.moveDown();
            doc.fontSize(12).text('Gracias por utilizar nuestro servicio.', { align: 'center' });

            // Finalizar el PDF
            doc.end();

            // Devolver la ruta del archivo generado
        });
    }
}

export default new PDFService();