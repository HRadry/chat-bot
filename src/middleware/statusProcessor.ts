import { Request, Response, NextFunction } from 'express';
import { setProcessedData } from '../utils/processWebhookData';

const statusProcessor = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const entry = req.body.entry && req.body.entry[0];
    if (!entry) {
      console.error('Webhook entry is missing');
      return next();
    }

    const changes = entry.changes && entry.changes[0];
    if (!changes) {
      console.error('Webhook changes are missing');
      return next();
    }

    const status = changes.value.statuses && changes.value.statuses[0];
    if (status) {
      setProcessedData(req, {
        type: 'status',
        id: status.id || 'N/A',
        status: status.status || 'N/A',
        timestamp: new Date().toISOString()
      });
    }

    next();
  } catch (error) {
    console.error('Error processing status webhook:', error);
    next();
  }
};

export default statusProcessor;
