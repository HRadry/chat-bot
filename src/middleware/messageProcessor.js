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

    const message = changes.value.messages && changes.value.messages[0];
    if (message) {
      setProcessedData(req, {
        type: 'message',
        phoneNumber: message.from || 'N/A',
        text: message.text && message.text.body || 'N/A',
        timestamp: new Date().toISOString()
      });
    }

    next();
  } catch (error) {
    console.error('Error processing message webhook:', error);
    next();
  }
};

module.exports = messageProcessor;
