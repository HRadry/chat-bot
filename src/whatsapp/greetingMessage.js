const axios = require('axios');
const { formatPhoneNumber } = require('../utils/phoneUtils'); // Importa a função de formatação

const sendGreetingMessage = async (phoneNumber) => {
  const formattedPhoneNumber = formatPhoneNumber(phoneNumber); // Formata o número

  const data = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: formattedPhoneNumber, // Usa o número formatado
    type: 'interactive',
    interactive: {
      type: 'button',
      body: {
        text: 'Bem-vindo ao Ponto Rápido! Como podemos te ajudar hoje?'
      },
      action: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'sales',
              title: 'Vendas'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'support',
              title: 'Suporte'
            }
          },
          {
            type: 'reply',
            reply: {
              id: 'appointments',
              title: 'Agendamentos'
            }
          }
        ]
      }
    }
  };

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        }
      }
    );
    console.log('Greeting message sent:', response.data);
  } catch (error) {
    console.error('Error sending greeting message:', error.response ? error.response.data : error.message);
  }
};

module.exports = sendGreetingMessage;
