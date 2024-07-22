// middleware/messageProcessor.js
const { setProcessedData } = require('../utils/processWebhookData');

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

    const value = changes.value;
    if (value) {
      // Obtém as informações dos contatos
      const contact = value.contacts && value.contacts[0];
      const message = value.messages && value.messages[0];

      // Inicializa ou atualiza o objeto contact
      req.processedData.contact = req.processedData.contact || {
        name: '', // O nome será preenchido posteriormente
        phoneNumber: '', // Número de telefone formatado
        whatsappId: '', // ID da conta WhatsApp
        step: 'Saudacao' // Define o passo inicial como 'Saudacao'
      };

      if (contact) {
        req.processedData.contact.name = contact.profile.name || '';
        req.processedData.contact.phoneNumber = contact.wa_id || '';
        req.processedData.contact.whatsappId = value.metadata.phone_number_id || '';
      }

      if (message) {
        // Preenche o texto da mensagem e outras informações
        setProcessedData(req, {
          type: 'message',
          phoneNumber: message.from || 'N/A',
          text: message.text && message.text.body ? message.text.body : 'N/A',
          timestamp: new Date().toISOString()
        });
      } else {
        console.error('Message is missing in webhook changes');
      }
    } else {
      console.error('Value is missing in webhook changes');
    }

    next();
  } catch (error) {
    console.error('Error processing message webhook:', error);
    next();
  }
};

module.exports = messageProcessor;
