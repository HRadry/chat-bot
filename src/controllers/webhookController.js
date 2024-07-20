// src/controllers/webhookController.js
const sendSalesMessage = require('../whatsapp/sendSalesMessage');
const sendAppointmentsMessage = require('../whatsapp/sendAppointmentsMessage');
const sendExitMessage = require('../whatsapp/sendExitMessage');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const sendSupportMessage = require('../whatsapp/sendSupportMessage'); // Importa a função para enviar mensagens de suporte
const { formatPhoneNumber } = require('../utils/phoneUtils'); // Importa a função de formatação

const handleWebhook = async (req, res) => {
  const { phoneNumber, text } = req.processedData;
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber); // Formata o número de telefone

  if (text) {
    const normalizedText = text.toLowerCase().trim();

    try {
      if (normalizedText === 'vendas') {
        // Enviar mensagem de vendas
        await sendSalesMessage(formattedPhoneNumber);
      } else if (normalizedText === 'agendamentos') {
        // Enviar mensagem de agendamentos
        await sendAppointmentsMessage(formattedPhoneNumber);
      } else if (normalizedText === 'sair') {
        // Enviar mensagem de saída
        await sendExitMessage(formattedPhoneNumber);
        // Enviar menu principal após a saudação
        await sendMenuPrincipal(formattedPhoneNumber);
      } else if (normalizedText === 'suporte') {
        // Enviar mensagem de suporte
        await sendSupportMessage(formattedPhoneNumber);
      } else {
        // Se o texto não corresponde a nenhum comando, envia a saudação e o menu principal
        await sendGreetingMessage(formattedPhoneNumber);
        await sendMenuPrincipal(formattedPhoneNumber);
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
    }
  }

  res.sendStatus(200); // Enviar resposta HTTP 200 OK
};

module.exports = { handleWebhook }; // Modificação aqui
