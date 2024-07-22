const sendMessage = require('../utils/messageSender');

const sendEmailMessage = async (phoneNumber) => {
  const messageData = {
    type: 'text',
    text: {
      body: 'Por favor, informe o e-mail de cadastro na empresa.'
    }
  };

  await sendMessage(phoneNumber, messageData);
};

module.exports = sendEmailMessage;
