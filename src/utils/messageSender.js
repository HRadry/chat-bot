// src/utils/messageSender.js
const axios = require('axios');

const sendMessage = async (phoneNumber, messageData) => {
  const { type, ...data } = messageData;

  try {
    await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: phoneNumber,
        type,
        ...data
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`
        }
      }
    );
    console.log(`Message sent: ${JSON.stringify(messageData)}`);
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
  }
};

module.exports = sendMessage;
