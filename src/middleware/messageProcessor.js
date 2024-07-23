// middleware/messageProcessor.js
const { setProcessedData } = require('../utils/processWebhookData');
const { formatPhoneNumber } = require('../utils/phoneUtils');  // Importe a função formatPhoneNumber

const messageProcessor = (req, res, next) => {
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
      
      const contact = {
        name: name || '',
        phoneNumber: formattedPhoneNumber || '',
        whatsappId: whatsappId || '',
        step: 'getCNPJ'
      };

      if (message.type === 'text') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.text && message.text.body ? message.text.body : 'N/A',
          timestamp: new Date().toISOString()
        });
      } else if (message.type === 'interactive' && message.interactive.type === 'button_reply') {
        setProcessedData(req, {
          type: 'message',
          contact: contact,
          text: message.interactive.button_reply.id || 'N/A',
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

module.exports = messageProcessor;
