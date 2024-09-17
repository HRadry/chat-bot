import express from 'express';
import { handleWebhook } from '../controllers/webhookController';
import {verifyWebhook} from '../controllers/verificationController';
import messageProcessor from '../middleware/messageProcessor';
import statusProcessor from '../middleware/statusProcessor';

const router = express.Router();

console.log("estoy en routes");

// Middleware de procesamiento básico
router.post('/', messageProcessor, statusProcessor, handleWebhook);

// Ruta para verificación del webhook
router.get('/', verifyWebhook);

export default router;
