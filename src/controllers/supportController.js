// controllers/supportController.js
const millDeskMiddleware = require('../middleware/milldeskMiddleware');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendEmailMessage = require('../whatsapp/sendEmailMessage');
const sendCNPJMessage = require('../whatsapp/sendCNPJMessage');
const sendDescriptionMessage = require('../whatsapp/sendDescriptionMessage'); // Novo arquivo para mensagem de descrição

const processContactMessage = async (req, res, next) => {
  const { contact } = req.processedData;
  const { normalizedText, formattedPhoneNumber } = req.processedData;

  switch (contact.step) {
    case 'getCNPJ':
      if (req.isValidCNPJ) {
        contact.cnpj = normalizedText;
        // Solicita o e-mail após o CNPJ ser validado
        await sendEmailMessage(formattedPhoneNumber);
        contact.step = 'getEmail';
      } else {
        await sendCNPJMessage(formattedPhoneNumber); // Mensagem de erro ou repetição
      }
      break;

    case 'getEmail':
      if (req.isValidEmail) {
        contact.email = normalizedText;
        // Solicita a descrição do problema após o e-mail ser validado
        await sendDescriptionMessage(formattedPhoneNumber);
        contact.step = 'getDescription';
      } else {
        await sendEmailMessage(formattedPhoneNumber); // Mensagem de erro ou repetição
      }
      break;

    case 'getDescription':
      contact.issueDescription = normalizedText;
      // Cria o ticket no MillDesk usando o middleware
      await millDeskMiddleware({ body: { contact } }, {}, () => {});
      // Envia a mensagem de confirmação ao usuário
      await sendConfirmationMessage(formattedPhoneNumber); // Novo arquivo para confirmação
      // Limpa os dados ou define o próximo passo se houver mais etapas
      delete contacts[formattedPhoneNumber];
      break;

    default:
      await sendGreetingMessage(formattedPhoneNumber); // Mensagem padrão
  }

  next();
};

module.exports = { processContactMessage };
