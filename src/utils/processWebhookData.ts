import { Request } from 'express';

interface ProcessedData {
  type: string;
  contact?: {
    name: string;
    phoneNumber: string;
    whatsappId: string;
    step: string;
  };
  text?: string;
  id?: string;
  status?: string;
  timestamp: string;
  
}

export function setProcessedData(req: Request, data: ProcessedData) {
  req.body = data;
}
