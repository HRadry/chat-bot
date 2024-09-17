import { Request, Response, NextFunction } from 'express';
// import redis from '../redisClient';
// import { createTicket } from '../millDeskApi/createTicket';
// import { validateEmail, emailExists } from '../millDeskApi/validationEmail';

import { sendValidationMessage } from '../whatsapp/sendValidationMessage';
import { sendGuideMessage } from '../whatsapp/sendGuideMessage'
import { sendMenuMessage } from '../whatsapp/sendMenuMessage';
import { sendAmountMessage, sendPhonePayeeMessage, sendReceiptMessage, sendSummaryMessage } from '../whatsapp/sendTransferMessage';
import { sendAuthMessage } from '../whatsapp/sendAuthMessage';
import { sendLocationMessage } from '../whatsapp/sendLocationMessage';
import { sendErrorAccountPayerMessage, sendErrorBlackListMessage } from '../whatsapp/sendErrorMessage';
import { mainFlowKeywords } from '../constants/keyword';
import { BlackListService } from '../modulos/resgistros/services/blackList.service';
import { lookUpClient, PartyInfoDfsp } from '../services/apiClients';
import { LogService } from '../modulos/resgistros/services/logs.service';
// const { sendCNPJMessage, sendInvalidCNPJMessage } = require('../whatsapp/sendCNPJMessage');
// const { validateCNPJ } = require('../utils/validationUtils'); // Verifique o caminho

// Funciones
const blackListService = new BlackListService();

export const handleWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const { type, text } = req.body;

  if (type === 'message' && text === 'hola') {
    const { contact: { phoneNumber }, text } = req.body;

    try {

      sendMenuMessage(phoneNumber);
      // Flujo Tranferencia

      // - Validar si el número que habla no está en lista negra sendErrorBlackListMessage(phoneNumber)

      //const isBlackListed = await blackListService.findByPartyIdentifierAndStatus(phoneNumber, 'blocked');

      //if (isBlackListed) await sendErrorBlackListMessage(phoneNumber);


      // - Validar si el número que habla existe en la base de datos (lookUpClient) 
      // - Errores:
      //    * Siel numero no tiene una cuenta asiociada sendErrorAccountPayeMessage(phoneNumber)

      // - Validar si tiene sesión activa sí: no enviar código no: enviar código

      // - Función para enviar código de verificación por twilio
      // - Mensaje de solicitud de código sendValidationMessage(phoneNumber)
      //    - Errores:
      //      * Enviar mensaje de intentos sendErrorAttempsMessage(phoneNumber)
      //      * Mandar mensaje de lista negra y enviarlo a la base de datos sendErrorAuthMessage(phoneNumber)
      //      => Insertar Logs y mandar a lista negra
      // => Crear sesión en base de datos 

      // - Enviar el menú de guía auditiva sendGuideMessage(phoneNumber)

      // - Dependiendo del idioma crear la guía
      // - Desplegar el menú sendMenuMessage(phoneNumber)

      // - Preguntar el teléfono del destinatario sendPhonePayeeMessage(phoneNumber)
      //    - Errores:
      //      * El número del destinatario no tiene cuenta asociada sendErrorPhonePayeeMessage(phoneNumber)
      //      * El número no tiene formato esperado sendErrorFormatPhonePayeeMessage(phoneNumber)
      //      * EL número de destino está en lista negra sendErrorBlackListMessage(phoneNumber)
      //      * La cuenta del destinatario esta bloqueada o inactiva sendErrorAccountMessage(phoneNumber)
      //      => Insertar Logs
      // - Preguntar el monto sendAmountMessage(phoneNumber)
      //    - Errores
      //      * El formato del monto es incorrecto sendErrorFormatAmountMessage(phoneNumber)
      //      * EL monto es menor a cero sendErrorAmountMessage(phoneNumber)
      //      * El payer no tiene fondos suficientes sendErrorFundsMessage(phoneNumber)
      //      => Insertar Logs
      // - Enviar resumen de operación sendSummaryMessage(phoneNumber)
      // - Solicitar autorización por voz sendAuthMessage(phoneNumber)
      //    - Errores
      //      * Error al autenticarse e indicarle que tiene tres intentos sendErrorAttempsMessage(phoneNumber)
      //      * Indicarle que se ha ido a lista negra sendErrorAuthMessage(phoneNumber)  
      //      => Insertar Logs
      // - Enviar recibo de operación sendReceiptMessage(phoneNumber)
      //    - Errores
      //      * Error genérico de transferencia sendErrorTransferMessage(phoneNumber)
      //      => Insertar Logs
      //      => Insertar Registro de historial
      // - Preguntar si quiere volver a menú

      // - Mensaje final sendEndMessage(phoneNumber)

      
      
    } catch (error) {
      console.error('Error handling webhook:', error);
    }
  } else if (type === 'status') {
    const { id, status } = req.body;
    console.log(`Message ID: ${id}, Status: ${status}`);
  }


  res.sendStatus(200);
};
