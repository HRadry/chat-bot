const sendMessage = require('../utils/messageSender');

const sendSupportMessage = async (phoneNumber) => {
  const supportData = {
    type: 'text',
    text: {
      body: 'Descreva seu problema de forma sucinta para anexarmos ao Chamado.'
    }
  };

  await sendMessage(phoneNumber, supportData);
};

module.exports = sendSupportMessage;
