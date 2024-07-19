// src/controllers/webhookController.js
const { sendMessage } = require('../whatsapp/sendMessage');

const handleWebhook = (req, res) => {
    try {
        const webhookEvent = req.body.entry[0].changes[0].value;
        const from = webhookEvent.contacts[0].wa_id;
        const messageBody = webhookEvent.messages[0].text.body;

        // Enviar resposta automática
        sendMessage(from, 'Olá! Esta é uma resposta automática.');

        res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        res.sendStatus(500);
    }
};

module.exports = { handleWebhook };
