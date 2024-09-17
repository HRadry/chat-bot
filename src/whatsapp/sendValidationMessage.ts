import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de solicitud de código de verificación
export const sendValidationMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: 'Recibirás un código de verificación en tu celular. Escríbelo a continuación.'
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Validation message sent to ${phoneNumber}`);
};
