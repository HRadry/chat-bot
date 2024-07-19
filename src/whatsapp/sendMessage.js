// src/Whatsapp/sendMessage.js
const axios = require('axios');
const { formatPhoneNumber } = require('../utils/phoneUtils');

async function sendMessage(to, message) {
    const accessToken = process.env.GRAPH_API_TOKEN;
    const phoneNumberId = process.env.PHONE_NUMBER_ID;
    const formattedPhoneNumber = formatPhoneNumber(to);

    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`,
            {
                messaging_product: 'whatsapp',
                to: formattedPhoneNumber,
                type: 'text',
                text: { body: message }
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('Mensagem enviada com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao enviar uma mensagem:', error.response ? error.response.data : error.message);
    }
}

module.exports = { sendMessage };
