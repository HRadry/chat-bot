import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de solicitud de numero de telefono del payee
export const sendPhonePayeeMessage = async (phoneNumber: string): Promise<void> => {

    const messageData = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
            body: '👤*¿A quién le quieres enviar?* 📱Escribe el número de teléfono del destinatario a diez dígitos.\n\nEjemplo: 9511234567'
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};


export const sendAmountMessage = async (phoneNumber: string): Promise<void> => {
    
    const messageData = {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type: 'text',
        text: {
            body: '¿Cuánto quieres enviar a *${myState.userDestinationData.PARTYINFO.FIRSTNAMES}*? 💰\n🔢Ingresa la cantidad usando solo números.\n\n_Ejemplo: 100, 1300, 120.5_'
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de saludo
export const sendSummaryMessage = async (phoneNumber: string): Promise<void> => {
    
    const messageData = {
        "type": "interactive",
        "interactive": {
            "type": "button",
            "body": {
                "text": `📄 Resumen de la operación: \n\nOrdenante: *{originUserData.PARTYINFO.FULLNAME}*\nBanco origen: *{originUserData.DFSPID}* \nMonto a enviar: *{amount} MXN*\n\nDestinatario: *{userDestinationData.PARTYINFO.FULLNAME}* \nBanco destino: *{userDestinationData.DFSPID}* \nCuenta destino: *{userDestinationData.PARTYINFO.ACCOUNTID}* \n\nComisión: *{fee} MXN* \n\n💲 Total: {amount} + {fee} = *{parseFloat(amount) + fee} MXN*`
            },
            "footer": {
                "text": "Si algo no esta correcto puedes cambiarlo"
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


export const sendReceiptMessage = async (phoneNumber: string): Promise<void> => {
    
    const messageData = {
        "type": "document",
        "document": {
          "id" : "1699500340836729", /* Only if using uploaded media */
          "caption": "🎉 ¡Transferencia Exitosa! 🎉\n\nGracias por utilizar nuestros servicios. ¡Que tengas un excelente día! 😊",
          "filename": "Recibo de transferencia"
        }
    };

    await sendMessage(phoneNumber, messageData);
    console.log(`Message sent to ${phoneNumber}`);
};
