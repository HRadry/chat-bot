// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');
const verificationController = require('../controllers/verificationController'); // Certifique-se de que o caminho está correto

// Rota para processar os webhooks
router.post('/', webhookController.handleWebhook);

// Rota para verificação do webhook
router.get('/', verificationController.verifyWebhook);

module.exports = router;

