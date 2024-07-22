// controllers/supportController.js
const sendSupportRequestMessage = require('../whatsapp/sendSupportRequestMessage');

const processContactMessage = async (req, res, next) => {
  const { contact } = req.processedData;

  if (!contact) {
    console.error('Contact data is missing');
    return next();
  }

  switch (contact.step) {
    case 'getCNPJ':
      // Envie a mensagem solicitando o CNPJ
      await sendSupportRequestMessage(contact.phoneNumber, 'Por favor, envie seu CNPJ.');
      contact.step = 'awaitingCNPJ';
      break;
    case 'awaitingCNPJ':
      // Lógica para lidar com a resposta do CNPJ
      contact.cnpj = req.processedData.text;
      contact.step = 'getEmail';
      await sendSupportRequestMessage(contact.phoneNumber, 'Por favor, envie seu email.');
      break;
    case 'getEmail':
      // Lógica para lidar com a resposta do email
      contact.email = req.processedData.text;
      contact.step = 'getDescription';
      await sendSupportRequestMessage(contact.phoneNumber, 'Por favor, descreva seu problema.');
      break;
    case 'getDescription':
      // Lógica para lidar com a resposta da descrição
      contact.description = req.processedData.text;
      contact.step = 'completed';
      await sendSupportRequestMessage(contact.phoneNumber, 'Obrigado! Seu pedido de suporte foi recebido.');
      break;
    default:
      console.error('Unknown step:', contact.step);
  }

  next();
};

module.exports = { processContactMessage };
