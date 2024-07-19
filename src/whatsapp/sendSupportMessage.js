const sendMessage = require('../utils/messageSender');

const sendSupportMessage = async (phoneNumber) => {
  const supportData = {
    type: 'text',
    text: {
      body: 'Por favor, descreva o máximo possível o seu problema. Iremos direcionar a conversa a um técnico disponível.'
    }
  };

  await sendMessage(phoneNumber, supportData);
};

module.exports = sendSupportMessage;
