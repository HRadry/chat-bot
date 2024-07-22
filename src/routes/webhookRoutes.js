// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const verificationController = require('../controllers/verificationController'); // Certifique-se de que o caminho está correto
const messageProcessor = require('../middleware/messageProcessor');
const statusProcessor = require('../middleware/statusProcessor');
const contactValidationMiddleware = require('../middleware/contactValidationMiddleware');
const { processContactMessage } = require('../controllers/supportController');

// Rota para processar os webhooks
router.post('/', messageProcessor, statusProcessor, (req, res, next) => {
    if (req.processedData.contact && ['getCNPJ', 'getEmail'].includes(req.processedData.contact.step)) {
      contactValidationMiddleware(req, res, next);
    } else {
      next();
    }
  }, processContactMessage, handleWebhook);

  
// Rota para verificação do webhook
router.get('/', verificationController.verifyWebhook);

module.exports = router;

