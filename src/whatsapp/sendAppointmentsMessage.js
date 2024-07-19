// src/whatsapp/sendAppointmentsMessage.js
const sendMessage = require('../utils/messageSender');

const sendAppointmentsMessage = async (phoneNumber) => {
  const appointmentsData = {
    type: 'text',
    text: {
      body: 'Ainda estamos em desenvolvimento, em breve você receberá uma conexão com nossa agenda.'
    }
  };

  await sendMessage(phoneNumber, appointmentsData);
};

module.exports = sendAppointmentsMessage;
