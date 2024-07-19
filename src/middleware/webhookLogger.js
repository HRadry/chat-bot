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
  
      const phoneNumber = message.from || 'N/A';
      const text = message.text && message.text.body || 'N/A';
      const timestamp = new Date().toISOString();
      
      // Log the received message details
      console.log('Received webhook message:');
      console.log(`Nome: ${message.from}`); // Ajuste conforme necessário
      console.log(`Número: ${phoneNumber}`);
      console.log(`Mensagem: ${text}`);
      console.log(`Data: ${timestamp}`);
      
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error processing webhook:', error);
      next();
    }
  };
  
  module.exports = webhookLogger;
  