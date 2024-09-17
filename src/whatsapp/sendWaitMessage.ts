import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de esperar
export const sendValidationMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: '⏳ Un momento, por favor...'
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};
