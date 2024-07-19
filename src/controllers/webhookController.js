// src/controllers/webhookController.js
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const sendSupportMessage = require('../whatsapp/sendSupportMessage');

const handleWebhook = async (req, res) => {
  const { phoneNumber, text } = req.processedData;

  console.log('Dados recebidos pelo controlador:');
  console.log(`Número: ${phoneNumber}`);
  console.log(`Texto original: ${text}`);

  const normalizedText = text.trim().toLowerCase();
  console.log('Texto normalizado:', normalizedText);

  try {
    if (normalizedText === 'olá') {
      console.log('Texto reconhecido como saudação');

      // Enviar mensagem de saudação
      await sendGreetingMessage(phoneNumber);

      // Enviar menu principal após a saudação
      await sendMenuPrincipal(phoneNumber);
    } else if (normalizedText === 'suporte') {
      console.log('Texto reconhecido como suporte');

      // Enviar mensagem de suporte
      await sendSupportMessage(phoneNumber);
    } else {
      console.log('Texto não reconhecido:', text);
    }
  } catch (error) {
    console.error('Erro ao processar o webhook:', error.message);
  }

  res.sendStatus(200);
};

module.exports = handleWebhook;
