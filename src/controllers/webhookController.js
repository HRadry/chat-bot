// controllers/webhookController.js
const sendSalesMessage = require('../whatsapp/sendSalesMessage');
const sendExitMessage = require('../whatsapp/sendExitMessage');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const { processContactMessage } = require('./supportController'); // Ajuste o caminho conforme necessário

const handleWebhook = async (req, res, next) => {
  const { type } = req.processedData;

  if (type === 'message') {
    const { contact, text } = req.processedData;
    const normalizedText = text.toLowerCase().trim();

    try {
      switch (normalizedText) {
        case 'vendas':
        case 'sales':  // ID do botão de vendas
          await sendSalesMessage(contact.phoneNumber);
          break;
        case 'sair':
        case 'exit':  // ID do botão de sair
          await sendExitMessage(contact.phoneNumber);
          await sendMenuPrincipal(contact.phoneNumber);
          break;
        case 'suporte':
        case 'support':  // ID do botão de suporte
          contact.step = contact.step || 'getCNPJ';
          await processContactMessage(req, res, next); // Chama o controlador para processar a mensagem
          break;
        default:
          await sendGreetingMessage(contact.phoneNumber);
          await sendMenuPrincipal(contact.phoneNumber);
          break;
      }
    } 
    catch (error) {
      console.error('Error handling webhook:', error);
    }
  } 
  else if (type === 'status') {
    const { id, status } = req.processedData;
    console.log(`Message ID: ${id}, Status: ${status}`);
  }

  res.sendStatus(200);
};

module.exports = { handleWebhook };
