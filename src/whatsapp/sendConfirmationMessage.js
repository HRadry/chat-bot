const sendMessage = require('../utils/messageSender');

const sendSupportMessage = async (phoneNumber) => {
  const supportData = {
    type: 'text',
    text: {
      body: 'Obrigado por Abrir um chamado na Ponto Rapido. Em breve um especialista entrará em contato.. '
    }
  };

  await sendMessage(phoneNumber, supportData);
  console.log(`confirmation message sent to ${phoneNumber}`);
};

module.exports = sendSupportMessage;
