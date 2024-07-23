// controllers/supportController.js
const sendCNPJMessage = require('../whatsapp/sendCNPJMessage');
const sendEmailMessage = require('../whatsapp/sendEmailMessage');
const sendDescriptionMessage = require('../whatsapp/sendDescriptionMessage');
const sendConfirmationMessage = require('../whatsapp/sendConfirmationMessage')

const processContactMessage = async (req, res, next) => {
  const { contact } = req.processedData;

  // Adicionando log para verificar o contato
  console.log('Processing contact:', contact);
  console.log('Text:', text);


  if (!contact) {
    console.error('Contact data is missing');
    return next();
  }
  console.log('Processing contact:', contact); // Adiciona log para depuração
  switch (contact.step) {
    case 'getCNPJ':
      await sendCNPJMessage(contact.phoneNumber);
      contact.step = 'awaitingCNPJ';
      break;
    case 'awaitingCNPJ':
      contact.cnpj = req.processedData.text;
      contact.step = 'getEmail';
      await sendEmailMessage(contact.phoneNumber, 'Por favor, envie seu email.');
      break;
    case 'getEmail':
      contact.email = req.processedData.text;
      contact.step = 'getDescription';
      await sendDescriptionMessage(contact.phoneNumber, 'Por favor, descreva seu problema.');
      break;
    case 'getDescription':
      contact.description = req.processedData.text;
      contact.step = 'completed';
      await sendConfirmationMessage(contact.phoneNumber, 'Obrigado! Seu pedido de suporte foi recebido.');
      break;
    default:
      console.error('Unknown step:', contact.step);
  }

  next();
};

module.exports = { processContactMessage };
