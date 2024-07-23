// routes/webhookRoutes.js
const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/webhookController');
const verificationController = require('../controllers/verificationController');
const messageProcessor = require('../middleware/messageProcessor');
const statusProcessor = require('../middleware/statusProcessor');
const contactValidationMiddleware = require('../middleware/contactValidationMiddleware');


router.post('/', messageProcessor, statusProcessor, (req, res, next) => {
    // Aplicar validação de CNPJ e e-mail apenas se o passo atual for relevante
    if (req.processedData.contact.step === 'getCNPJ' || req.processedData.contact.step === 'getEmail') {
      contactValidationMiddleware(req, res, next);
    } else {
      next();
    }
  }, handleWebhook);
  
// Rota para verificação do webhook
router.get('/', verificationController.verifyWebhook);

module.exports = router;

