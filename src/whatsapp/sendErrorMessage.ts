import sendMessage from '../utils/messageSender';

// Función para enviar mensaje de ingreso a la blacklist
export const sendErrorAuthMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: '🚨 Estás bloqueado por intentos fallidos de verificación. Contacta con soporte si necesitas ayuda.'
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de error de código
export const sendErrorAttempsMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: '🚨 Autenticación incorrecta. Te quedan ${maxAttempts - newAttempts} intentos. Por favor, intenta de nuevo enviando nuevamente el audio.  Asegúrate de estar en un lugar sin mucho ruido y de hablar de forma clara.'
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de error en lookup
export const sendErrorLookupMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: '🚨 No se puede obtener la información del destinatario en este momento. Por favor, intenta más tarde.'
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};


// Función para enviar mensaje de error en la cuenta destino
export const sendErrorAccountMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: '🚨 La cuenta destino está bloqueada o inactiva.'
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};


// Función para enviar mensaje de party está lista negra
export const sendErrorBlackListMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: `🚨 El número de teléfono {payerPartyIdentifier} está en la lista negra. No se puede procesar la solicitud.`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de que el número de destinatario no tiene una cuenta asociada
export const sendErrorPhonePayeeMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: `🚨 El número de teléfono {recipientPhoneNumber} no tiene cuenta asociada..`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de que el número no tiene una cuenta asociada
export const sendErrorAccountPayerMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    "type": "interactive",
    "interactive": {
      "type": "cta_url",
      "header": {
        "type": "text",
        "text": "Aun no tienes una cuenta"

      },
      "body": {
        "text": `🚨 El número de teléfono {payerPartyIdentifier} no tiene una cuenta asociada.🔗 Por favor, regístrate en nuestra página.`
      },
      "footer": {
        "text": "Haz clic en el enlace y completa el formulario."
      },
      "action": {
        "name": "cta_url",
        "parameters": {
          "display_text": "Cámara de la Gente",
          "url": "https://lacamara.mx/"
        }
      }
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de que el formato del número es incorrecto
export const sendErrorFormatPhonePayeeMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: `🚨 El número de teléfono debe tener diez dígitos. \n\n _Ejemplo: 9513215956_.`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de que el monto debe ser mayor a cero
export const sendErrorAmountMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: `🚨  El monto ingresado debe ser mayor a 0 para proceder con la operación.`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};


// Función para enviar mensaje de fondos insuficientes
export const sendErrorFundsMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: `🚨 ¡Lo sentimos! No tienes fondos suficientes en tu cuenta para completar esta transacción.\n\n⚠️ Sugerencias:\n1. Depositar fondos en tu cuenta.\n2. Revisar tus transacciones recientes para identificar movimientos inusuales.`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de formato de monto
export const sendErrorFormatAmountMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: `🚨 El monto debe tener solo números.\n\n_Ejemplo: 100, 1300, 120.5_.`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};

// Función para enviar mensaje de error genérico de transferencia
export const sendErrorTransferMessage = async (phoneNumber: string): Promise<void> => {

  const messageData = {
    messaging_product: 'whatsapp',
    to: phoneNumber,
    type: 'text',
    text: {
      body: `🚨 Ocurrió un error al procesar tu transferencia. Por favor, intenta nuevamente más tarde.`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Error message sent to ${phoneNumber}`);
};
