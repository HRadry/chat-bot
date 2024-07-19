// src/Whatsapp/sendMessage.js
const axios = require('axios');

// Função para enviar uma mensagem pelo WhatsApp
const sendMessage = async (recipientId, messageBody) => {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
            {
                messaging_product: "whatsapp",
                to: recipientId,
                type: "text",
                text: { body: messageBody }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GRAPH_API_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log('Mensagem enviada com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao enviar a mensagem:', error.response ? error.response.data : error.message);
    }
};

module.exports = sendMessage;
