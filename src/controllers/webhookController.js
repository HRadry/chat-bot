const sendGreetingMessage = require('../whatsapp/greetingMessage');

const handleWebhook = (req, res) => {
  try {
    const { phoneNumber, text } = req.processedData;

    // Lógica de negócios: Enviar a mensagem de saudação
    if (text) {
      sendGreetingMessage(phoneNumber);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao processar o webhook:', error);
    res.sendStatus(500); // Internal Server Error
  }
};

module.exports = { handleWebhook };
