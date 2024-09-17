import { Request, Response, NextFunction } from 'express';
import { setProcessedData } from '../utils/processWebhookData';
import { formatPhoneNumber } from '../utils/phoneUtils';


// Definición de la interfaz para los datos de contacto
interface Contact {
  name: string;
  phoneNumber: string;
  whatsappId: string;
  step: string;
}

// Definición de la interfaz para los datos del mensaje
interface ProcessedData {
  type: string;
  contact: Contact;
  text?: string;
  timestamp: string;
}

const messageProcessor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
 
  try {
    const entry = req.body.entry && req.body.entry[0];
    if (!entry) {
      console.error('Webhook entry is missing');
      return next();
    }

    const changes = entry.changes && entry.changes[0];
    if (!changes) {
      console.error('Webhook changes are missing');
      return next();
    }

    const message = changes.value.messages && changes.value.messages[0];
    if (message) {
      const contacts = changes.value.contacts && changes.value.contacts[0];
      const formattedPhoneNumber = formatPhoneNumber(message.from);  // Formate o número de telefone
      
      
      const name = contacts ? contacts.profile.name : 'N/A';
      const whatsappId = contacts ? contacts.wa_id : 'N/A';
      
      let contact: Contact | null = null;

     
        console.log('En contact::: ', formattedPhoneNumber);
        contact = {
          name: name || '',
          phoneNumber: formattedPhoneNumber || '',
          whatsappId: whatsappId || '',
          step: ''
        };
       
        console.log('message.type::',message)
      if (message.type === 'text') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.text && message.text.body ? message.text.body : 'N/A',
          timestamp: new Date().toISOString()
        });
      } else if (message.type === 'interactive' && message.interactive.type === 'list_reply') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.interactive.list_reply.id || 'N/A',
          timestamp: new Date().toISOString()
        });
      }else if (message.type === 'interactive' && message.interactive.type === 'location_request_message') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.interactive.location_request_message.id || 'N/A',
          timestamp: new Date().toISOString()
        });
      }else if (message.type === 'interactive' && message.interactive.type === 'cta_url') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.interactive.cta_url.id || 'N/A',
          timestamp: new Date().toISOString()
        });
      } else {
        console.error('Message is missing or not of type text/button_reply in webhook changes');
      }
    }

    next();
  } catch (error) {
    console.error('Error processing message webhook:', error);
    next();
  }
};

export default messageProcessor;
