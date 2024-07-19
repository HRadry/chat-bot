// src/controllers/webhookController.js
const sendSalesMessage = require('../whatsapp/sendSalesMessage');
const sendAppointmentsMessage = require('../whatsapp/sendAppointmentsMessage');
const sendExitMessage = require('../whatsapp/sendExitMessage');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const sendSupportMessage = require('../whatsapp/sendSupportMessage'); // Importa a função para enviar mensagens de suporte

const handleWebhook = async (req, res) => {
  const { phoneNumber, text } = req.processedData;

  if (text) {
    const normalizedText = text.toLowerCase().trim();

    try {
      if (normalizedText === 'vendas') {
        // Enviar mensagem de vendas
        await sendSalesMessage(phoneNumber);
      } else if (normalizedText === 'agendamentos') {
        // Enviar mensagem de agendamentos
        await sendAppointmentsMessage(phoneNumber);
      } else if (normalizedText === 'sair') {
        // Enviar mensagem de saída
        await sendExitMessage(phoneNumber);
      } else if (normalizedText === 'ola') {
        // Enviar mensagem de saudação
        await sendGreetingMessage(phoneNumber);
        // Enviar menu principal após a saudação
        await sendMenuPrincipal(phoneNumber);
      } else if (normalizedText === 'suporte') {
        // Enviar mensagem de suporte
        await sendSupportMessage(phoneNumber);
      } else {
        console.log('Texto não reconhecido:', text);
        await sendGreetingMessage(phoneNumber); //teste
        // Enviar menu principal após a saudação
        await sendMenuPrincipal(phoneNumber);//teste
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
    }
  }

  res.sendStatus(200); // Enviar resposta HTTP 200 OK
};

module.exports = { handleWebhook }; // Modificação aqui
