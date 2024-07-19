const sendMessage = require('../whatsapp/sendMessage'); // Certifique-se de que o caminho está correto

const handleWebhook = async (req, res) => {
    try {
        const { entry } = req.body;

        if (!entry || entry.length === 0) {
            return res.status(400).send('No entry found');
        }

        const { changes } = entry[0];
        if (!changes || changes.length === 0) {
            return res.status(400).send('No changes found');
        }

        const { value } = changes[0];
        const { messages } = value;

        if (!messages || messages.length === 0) {
            return res.status(400).send('No messages found');
        }

        const message = messages[0];
        const { from } = message; // Pega o ID do remetente

        console.log(`Mensagem recebida de ${from}`);

        // Enviar uma resposta automática
        await sendMessage(from, 'Olá! Esta é uma resposta automática.');

        return res.status(200).send('Event received');
    } catch (error) {
        console.error('Erro ao processar o webhook:', error);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    handleWebhook,
};
