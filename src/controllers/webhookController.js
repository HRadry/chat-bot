// controllers/webhookController.js
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
//const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const sendCNPJMessage = require('../whatsapp/sendCNPJMessage');
const sendEmailMessage = require('../whatsapp/sendEmailMessage');
const { validateCNPJ, validateEmail } = require('../utils/validationUtils'); // Verifique o caminho
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
        case 'awaitCNPJ':
          if (validateCNPJ(text)) {
            contact.cnpj = text;
            console.log('CNPJ is valid:', contact.cnpj);
            await sendEmailMessage(contact.phoneNumber);
            contact.step = 'awaitEMAIL';
            await redis.set(contact.whatsappId,JSON.stringify(contact));
          } else {
            console.log('Invalid CNPJ:', text);
            // Enviar mensagem de erro ou instruções adicionais se necessário
          }
          break;
        case 'awaitEMAIL':
          if (validateEmail(text)) {
            contact.email = text;
            console.log('Email is valid:', contact.email);
            contact.step = 'completed'; // Marca a conversa como completa
            await redis.set(contact.whatsappId,JSON.stringify(contact))
          } else {
              console.log('Invalid email:', text);
              // Enviar mensagem de erro ou instruções adicionais se necessário
          }
          break;
        case 'completed':
          console.log('completamos')   
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
