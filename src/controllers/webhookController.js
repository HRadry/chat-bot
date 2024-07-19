const sendGreetingMessage = require('../whatsapp/greetingMessage');

const handleWebhook = (req, res) => {
  try {
    const changes = req.body.entry[0].changes[0];
    const message = changes.value.messages[0];
    const phoneNumber = message.from;

    if (message.text && message.text.body) {
      // Enviar mensagem de saudação
      sendGreetingMessage(phoneNumber);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao processar o webhook:', error);
    res.sendStatus(500);
  }
};

module.exports = { handleWebhook };
