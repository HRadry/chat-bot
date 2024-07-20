const sendSalesMessage = require('../whatsapp/sendSalesMessage');
const sendExitMessage = require('../whatsapp/sendExitMessage');
const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const sendMenuPrincipal = require('../whatsapp/sendMenuPrincipal');
const sendSupportMessage = require('../whatsapp/sendSupportMessage'); // Importa a função para enviar mensagens de suporte
const { formatPhoneNumber } = require('../utils/phoneUtils'); // Importa a função de formatação

const handleWebhook = async (req, res) => {
  const { phoneNumber, text } = req.processedData; // Extrai phoneNumber e text de req.processedData
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber); // Formata o número de telefone

  if (text) { // Verifica se o texto está presente
    const normalizedText = text.toLowerCase().trim(); // Normaliza o texto para facilitar a comparação

    try {
      if (normalizedText === 'vendas') {
        // Enviar mensagem de vendas
        await sendSalesMessage(formattedPhoneNumber);
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
      console.error('Error handling webhook:', error); // Loga qualquer erro que ocorra durante o processo
    }
  }

  res.sendStatus(200); // Envia resposta HTTP 200 OK
};

module.exports = { handleWebhook }; // Exporta o controlador
