const webhookLogger = (req, res, next) => {
  try {
    const entry = req.body.entry && req.body.entry[0];
    if (!entry) {
      //console.error('Webhook entry is missing');
      return next();
    }

    const changes = entry.changes && entry.changes[0];
    if (!changes) {
      //console.error('Webhook changes are missing');
      return next();
    }

    const message = changes.value.messages && changes.value.messages[0];
    if (!message) {
      //console.error('Message is missing');
      return next();
    }

    // Definir os dados processados no objeto de requisição
    req.processedData = {
      phoneNumber: message.from || 'N/A',
      text: message.text && message.text.body || 'N/A',
      timestamp: new Date().toISOString()
    };
    next();
  } catch (error) {
    console.error('Error processing webhook:', error);
    next();
  }
};

module.exports = webhookLogger;
