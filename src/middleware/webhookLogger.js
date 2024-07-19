const webhookLogger = (req, res, next) => {
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
    if (!message) {
      console.error('Message is missing');
      return next();
    }

    // Attach processed data to the request object
    req.processedData = {
      phoneNumber: message.from || 'N/A',
      text: message.text && message.text.body || 'N/A',
      timestamp: new Date().toISOString()
    };

    // Log the received message details
    console.log('Received webhook message:');
    console.log(`Nome: ${req.processedData.phoneNumber}`);
    console.log(`Número: ${req.processedData.phoneNumber}`);
    console.log(`Mensagem: ${req.processedData.text}`);
    console.log(`Data: ${req.processedData.timestamp}`);

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error processing webhook:', error);
    next();
  }
};

module.exports = webhookLogger;
