// src/whatsapp/sendExitMessage.js
const sendMessage = require('../utils/messageSender');

const sendExitMessage = async (phoneNumber) => {
  const exitData = {
    type: 'text',
    text: {
      body: 'A Ponto Rápido agradece seu contato. Boa tarde!'
    }
  };

  await sendMessage(phoneNumber, exitData);
};

module.exports = sendExitMessage;
