const sendGreetingMessage = require('../whatsapp/sendGreetingMessage');
const { getConversation, hasConversationExpired, updateConversation } = require('../utils/conversationManager');

const handleWebhook = (req, res) => {
  try {
    const { phoneNumber, text } = req.processedData;

    // Lógica de negócios: Verificar se o usuário já foi saudado ou se a conversa expirou
    if (text) {
      const conversation = getConversation(phoneNumber);

      if (hasConversationExpired(phoneNumber) || !conversation.greeted) {
        // Enviar mensagem de saudação
        sendGreetingMessage(phoneNumber);
        updateConversation(phoneNumber, { greeted: true });
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro ao processar o webhook:', error);
    res.sendStatus(500); // Internal Server Error
  }
};

module.exports = { handleWebhook };
