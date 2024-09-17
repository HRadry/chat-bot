import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de requiere autenticación
export const sendAuthMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
            body: '🔒 Autorización Requerida.\n\nPor favor, autoriza la operación para continuar.\n\n🎙Envía un audio diciendo lo siguiente:\n "Me llamo ${name} y soy de Oaxaca de Juarez.'
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Auth message sent to ${phoneNumber}`);
};