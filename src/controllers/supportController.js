// controllers/contactController.js
const millDeskMiddleware = require('../middleware/milldeskMiddleware');
const { sendGreetingMessage, sendEmailMessage, sendCNPJMessage } = require('../whatsapp');

const processContactMessage = async (req, res, next) => {
  const { contact } = req.body;
  const { normalizedText, formattedPhoneNumber } = req.processedData;

  switch (contact.step) {
    case 'getCNPJ':
      if (req.isValidCNPJ) {
        contact.cnpj = normalizedText;
        await sendEmailMessage(formattedPhoneNumber);
        contact.step = 'getEmail';
      } else {
        await sendCNPJMessage(formattedPhoneNumber); // Mensagem de erro ou repetição
      }
      break;

    case 'getEmail':
      if (req.isValidEmail) {
        contact.email = normalizedText;
        await sendEmailMessage(formattedPhoneNumber);
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
      // Aqui você pode enviar uma mensagem para um técnico se necessário
      // Limpa os dados ou define o próximo passo se houver mais etapas
      delete contacts[formattedPhoneNumber];
      break;

    default:
      await sendGreetingMessage(formattedPhoneNumber); // Mensagem padrão
  }

  next();
};

module.exports = { processContactMessage };
