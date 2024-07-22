// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const verificationController = require('../controllers/verificationController'); // Certifique-se de que o caminho está correto
const messageProcessor = require('../middleware/messageProcessor');
const statusProcessor = require('../middleware/statusProcessor');
const verificationMiddleware = require('../middleware/verificationMiddleware');
const contactValidationMiddleware = require('../middleware/contactValidationMiddleware');
const { processContactMessage } = require('../controllers/supportController');

// Rota para processar os webhooks
router.post('/', messageProcessor, statusProcessor, verificationMiddleware, contactValidationMiddleware, processContactMessage, handleWebhook);



// Rota para processar os webhooks
router.post('/', messageProcessor, statusProcessor, verificationMiddleware, handleWebhook );

// Rota para verificação do webhook
router.get('/', verificationController.verifyWebhook);

module.exports = router;

