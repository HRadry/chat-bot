// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const verificationController = require('../controllers/verificationController'); // Certifique-se de que o caminho está correto
const messageProcessor = require('../middleware/messageProcessor');
const statusProcessor = require('../middleware/statusProcessor');

// Rota para processar os webhooks
router.post('/', messageProcessor, statusProcessor, handleWebhook );

// Rota para verificação do webhook
router.get('/', verificationController.verifyWebhook);

module.exports = router;

