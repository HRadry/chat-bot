const sendMessage = require('../utils/messageSender');

// Mensagem para saber quem é o responsável pelo chamado
const sendResponsibleNameMessage = async (phoneNumber) => {
  const messageData = {
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: `🕵️‍♂️ Quem vai ser o super-herói que vai gerenciar este chamado? 😎 Pode me contar o nome da pessoa responsável? 💪✨`
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Responsible name message sent to ${phoneNumber}`);
};

// Mensagem para solicitar o contato do responsável
const sendResponsibleContactMessage = async (phoneNumber) => {
  const messageData = {
    messaging_product: 'whatsapp',
    type: 'text',
    text: {
      body: '📞 Ótimo! Agora, para facilitar o nosso contato e garantir que tudo corra bem, poderia me passar o telefone do nosso super-seroi? Por favor, envie o número completinho, com o DDD e sem espaços ou caracteres especiais. Exemplo: 11987654321 😊✨'
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`Responsible contact message sent to ${phoneNumber}`);
};

module.exports = { sendResponsibleNameMessage, sendResponsibleContactMessage };
