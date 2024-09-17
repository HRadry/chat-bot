import sendMessage from '../utils/messageSender';

interface Contact {
    name: string;
    phoneNumber: string;
}

// Función para enviar mensaje de saludo
export const sendGreetingMessage = async (contact: Contact): Promise<void> => {
    const { name, phoneNumber } = contact;
    console.log('phoneNumber .... ', phoneNumber);

    const messageData = {
        messaging_product: 'whatsapp',
        type: 'image',
        image: {
            link: 'https://github.com/juliuscxlopes/Wpp-Railways/blob/master/src/assets/Imagem%20do%20WhatsApp%20de%202024-07-24%20%C3%A0(s)%2011.03.31_df30f9c6.jpg?raw=true',
            caption: `🎉 Hola, *${name}*! ¡Bienvenido a Ponto Rápiddddo! 🚀 Soy Paty, tu asistente virtual de soporte, y estoy aquí para ayudarte con lo que necesites. 😄✨`
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Greeting message sent to ${name} at ${phoneNumber}`);
};
