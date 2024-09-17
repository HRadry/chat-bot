import sendMessage from '../utils/messageSender';


// Función para enviar mensaje de menú
export const sendMenuMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        "type": "interactive",
        "interactive": {
            "type": "button",
            "header": {
                "type": "image",
                "image": {
                    "id": "508662931762879"
                }
            },
            "body": {
                "text": `🙌 Hola *{name}* de 🏦*smbcontigo*, bienvenido a la Cámara de la Gente🤝, una manera fácil de enviar dinero desde WhatsApp.💸\n\nHaz clic en un botón para iniciar una operación, nuestro chat te guiará paso a paso.✨`
            },
            "footer": {
                "text": "Selecciona una opción"
            },
            "action": {
                "buttons": [
                    {
                        "type": "reply",
                        "reply": {
                            "id": "1",
                            "title": "Consultar saldo"
                        }
                    },
                    {
                        "type": "reply",
                        "reply": {
                            "id": "2",
                            "title": "Transferir"
                        }
                    }
                ]
            }
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};
