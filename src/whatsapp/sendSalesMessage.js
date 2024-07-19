// src/whatsapp/sendSalesMessage.js
const sendMessage = require('../utils/messageSender');

const sendSalesMessage = async (phoneNumber) => {
  const salesData = {
    type: 'text',
    text: {
      body: 'Vamos conectá-lo com um consultor. Por favor, aguarde um momento.'
    }
  };

  await sendMessage(phoneNumber, salesData);
};

module.exports = sendSalesMessage;
