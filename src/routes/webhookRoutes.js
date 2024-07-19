// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const verificationController = require('../controllers/verificationController'); // Certifique-se de que o caminho está correto
const webhookLogger = require('../middleware/webhookLogger'); // Importa o middleware

// Rota para processar os webhooks
router.post('/', webhookLogger, handleWebhook );

// Rota para verificação do webhook
router.get('/', verificationController.verifyWebhook);

module.exports = router;

