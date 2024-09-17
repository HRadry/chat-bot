import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de solicitud de código para autenticación
export const sendBalanceMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
          body: `{originUserData.PARTYINFO.FIRSTNAMES}*, Tu saldo es: *{response.SALDO}*\n\nGracias por usar nuestros servicios. Ten un lindo día! 😊`
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};
