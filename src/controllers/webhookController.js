// controllers/webhookController.js
const sendSalesMessage = require('../whatsapp/sendSalesMessage');
const sendExitMessage = require('../whatsapp/sendExitMessage');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const sendSupportMessage = require('../whatsapp/sendSupportMessage');
const { formatPhoneNumber } = require('../utils/phoneUtils');
const { processContactMessage } = require('./supportController'); // Ajuste o caminho conforme necessário

const handleWebhook = async (req, res) => {
  const { type } = req.processedData;

  if (type === 'message') {
    const { phoneNumber, text } = req.processedData;
    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
    const normalizedText = text.toLowerCase().trim();

    try {
      switch (normalizedText) {
        case 'vendas':
        case 'sales':  // ID do botão de vendas
          await sendSalesMessage(formattedPhoneNumber);
          break;
        case 'sair':
        case 'exit':  // ID do botão de sair
          await sendExitMessage(formattedPhoneNumber);
          await sendMenuPrincipal(formattedPhoneNumber);
          break;
        case 'suporte':
        case 'support':  // ID do botão de suporte
          await sendSupportMessage(formattedPhoneNumber);
          // Adiciona um passo para iniciar o processo de coleta de informações
          //req.processedData.contact = { step: 'getCNPJ', phoneNumber: formattedPhoneNumber };
          await processContactMessage(req, res, () => {}); // Chama o controlador para processar a mensagem
          break;
        default:
          await sendGreetingMessage(formattedPhoneNumber);
          await sendMenuPrincipal(formattedPhoneNumber);
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
    // Adicione lógica para lidar com status de mensagens se necessário
  }

  res.sendStatus(200);
};

module.exports = { handleWebhook };
