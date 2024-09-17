import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de solicitud de localización
export const sendLocationMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        "type": "interactive",
        "interactive": {
            "type": "location_request_message",
            "body": {
                "text": "📍 Por favor, comparte tu ubicación para continuar."
            },
            "action": {
                "name": "send_location"
            }
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};
