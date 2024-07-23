// controllers/supportController.js
const sendCNPJMessage = require('../whatsapp/sendCNPJMessage');
const sendEmailMessage = require('../whatsapp/sendEmailMessage');
const sendDescriptionMessage = require('../whatsapp/sendDescriptionMessage');
const sendConfirmationMessage = require('../whatsapp/sendConfirmationMessage')
const contactValidationMiddleware = require('../middleware/contactValidationMiddleware');

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
      // Envia mensagem solicitando o CNPJ
      await sendCNPJMessage(contact.phoneNumber);
      contact.step = 'awaitingCNPJ';
      break;
    case 'awaitingCNPJ':
      // Valida o CNPJ recebido
      contact.cnpj = text;
      req.processedData.normalizedText = text; // Normaliza o texto para a validação
      contactValidationMiddleware(req, res, () => {}); // Executa o middleware de validação
      
      if (req.isValidCNPJ) {
        contact.step = 'getEmail';
        await sendEmailMessage(contact.phoneNumber, 'Por favor, envie seu email.');
      } else {
        await sendCNPJMessage(contact.phoneNumber, 'CNPJ inválido. Por favor, envie um CNPJ válido.');
      }
      break;

    case 'getEmail':
      // Valida o e-mail recebido
      contact.email = text;
      req.processedData.normalizedText = text; // Normaliza o texto para a validação
      contactValidationMiddleware(req, res, () => {}); // Executa o middleware de validação
      
      if (req.isValidEmail) {
        contact.step = 'getDescription';
        await sendDescriptionMessage(contact.phoneNumber, 'Por favor, descreva seu problema.');
      } else {
        await sendEmailMessage(contact.phoneNumber, 'E-mail inválido. Por favor, envie um e-mail válido.');
      }
      break;

      case 'getDescription':
        contact.description = text;
        contact.step = 'completed';
        await sendConfirmationMessage(contact.phoneNumber, 'Obrigado! Seu pedido de suporte foi recebido.');
        break;

    default:
      console.error('Unknown step:', contact.step);
  }

  next();
};

module.exports = { processContactMessage };
