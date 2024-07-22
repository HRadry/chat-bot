const sendMessage = require('../utils/messageSender');

const sendSupportMessage = async (phoneNumber) => {
  const supportData = {
    type: 'text',
    text: {
      body: 'Poxa, que pena que esta passando por problemas.. Vou abrir um chamado para você e conecta-lo com um especialista.. Um Momento.. '
    }
  };

  await sendMessage(phoneNumber, supportData);
  console.log(`Suport message sent to ${phoneNumber}`);
};

module.exports = sendSupportMessage;
