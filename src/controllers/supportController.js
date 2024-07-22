// controllers/supportController.js
const millDeskMiddleware = require('../middleware/milldeskMiddleware');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendEmailMessage = require('../whatsapp/sendEmailMessage');
const sendCNPJMessage = require('../whatsapp/sendCNPJMessage');
const sendDescriptionMessage = require('../whatsapp/sendDescriptionMessage'); // Novo arquivo para mensagem de descrição

const processContactMessage = async (req, res, next) => {
  const { contact } = req.processedData || {};

  if (!contact) {
    console.error('Contact object is not defined.');
    return res.status(400).send('Contact object is missing.');
  }

  const { step, phoneNumber } = contact;
  const { normalizedText } = req.processedData;

  switch (step) {
    case 'getCNPJ':
      if (req.isValidCNPJ) {
        contact.cnpj = normalizedText;
        await sendEmailMessage(phoneNumber);
        contact.step = 'getEmail';
      } else {
        await sendCNPJMessage(phoneNumber); // Mensagem de erro ou repetição
      }
      break;

    case 'getEmail':
      if (req.isValidEmail) {
        contact.email = normalizedText;
        contact.step = 'getDescription';
        // Envia mensagem solicitando a descrição do problema
        await sendDescriptionMessage(phoneNumber);
      } else {
        await sendEmailMessage(phoneNumber); // Mensagem de erro ou repetição
      }
      break;

    case 'getDescription':
      contact.issueDescription = normalizedText;
      // Cria o ticket no MillDesk usando o middleware
      await millDeskMiddleware({ body: { contact } }, {}, () => {});
      // Envia a mensagem de confirmação ao usuário
      await sendConfirmationMessage(phoneNumber);
      delete req.processedData.contact; // Limpa os dados ou define o próximo passo
      break;

    default:
      await sendGreetingMessage(phoneNumber); // Mensagem padrão
  }

  next();
};

module.exports = { processContactMessage };