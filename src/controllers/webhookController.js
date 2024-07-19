exports.handleWebhook = (req, res) => {
    const body = req.body;

    // Verifique se o webhook é de uma conta de negócios do WhatsApp
    if (body.object === "whatsapp_business_account") {
        console.log('Webhook received:', JSON.stringify(body, null, 2));

        // Itere sobre as entradas
        body.entry.forEach(function(entry) {
            // Itere sobre as mudanças
            entry.changes.forEach(function(change) {
                if (change.field === "messages") {
                    const value = change.value;

                    // Verifique se é uma mensagem recebida ou uma notificação de status
                    if (value.messages) {
                        // Mensagens recebidas
                        value.messages.forEach(function(message) {
                            console.log("Mensagem recebida:", message);
                            // Adicione a lógica de processamento da mensagem aqui
                        });
                    } else if (value.statuses) {
                        // Notificações de status
                        value.statuses.forEach(function(status) {
                            console.log("Notificação de status:", status);
                            // Adicione a lógica de processamento do status aqui
                        });
                    }
                }
            });
        });

        // Responda com 200 OK para confirmar o recebimento
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Responda com 404 Not Found se o evento não for de uma conta de negócios do WhatsApp
        res.sendStatus(404);
    }
};
