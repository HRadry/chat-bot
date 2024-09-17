import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de despedida
export const sendEndMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: '🚀 Gracias por usar nuestros servicios. ¡Hasta luego!'
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};
