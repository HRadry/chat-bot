// controllers/webhookController.js
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const sendCNPJMessage = require('../whatsapp/sendCNPJMessage');
const sendEmailMessage = require('../whatsapp/sendEmailMessage');
const { processContactMessage } = require('../utils/validationUtils'); // Verifique o caminho
const redis = require('../redisClient');

const handleWebhook = async (req, res, next) => {
  const { type } = req.processedData;

  if (type === 'message') {
    const { contact, text } = req.processedData;
    const normalizedText = text.toLowerCase().trim();

    console.log('Received message:', { contact, text });

    try {
      switch (contact.step) {
        case '':  // Se o step estiver vazio, inicia a conversa com a saudação
          await sendGreetingMessage(contact.phoneNumber);
          await sendCNPJMessage(contact.phoneNumber);
          contact.step = 'awaitCNPJ';  // Define o próximo passo
          await redis.set(contact.whatsappId,JSON.stringify(contact))
          break;
        case 'getEmail':
          await sendEmailMessage(contact.phoneNumber);
          contact.step = 'awaitEMAIL';  // Define o próximo passo
          await redis.set(contact.whatsappId,JSON.stringify(contact))
          break;
        default:
          console.log('Default case for message handling');
          break;
      }
      // Chama processContactMessage apenas quando o step é 'awaitCNPJ' ou 'awaitEMAIL'
      if (contact.step === 'awaitCNPJ' || contact.step === 'awaitEMAIL') {
        await processContactMessage(contact, normalizedText);
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
    }
  } else if (type === 'status') {
    const { id, status } = req.processedData;
    console.log(`Message ID: ${id}, Status: ${status}`);
  }

  res.sendStatus(200);
};

module.exports = { handleWebhook };
