const sendMessage = require('../utils/messageSender');

const sendCNPJMessage = async (phoneNumber) => {
  const messageData = {
    type: 'text',
    text: {
      body: 'Agora para adiantar nosso atendimento, por favor informe o CNPJ da empresa cadastrada.'
    }
  };

  await sendMessage(phoneNumber, messageData);
  console.log(`CNPJ message sent to ${phoneNumber}`);
};

module.exports = sendCNPJMessage;


