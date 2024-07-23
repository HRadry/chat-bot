// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const verificationController = require('../controllers/verificationController');
const messageProcessor = require('../middleware/messageProcessor');
const statusProcessor = require('../middleware/statusProcessor');
const { processContactMessage } = require('../controllers/supportController');

// Middleware de processamento básico
router.post('/', messageProcessor, statusProcessor, handleWebhook, processContactMessage);

// Rota para verificação do webhook
router.get('/', verificationController.verifyWebhook);

module.exports = router;

