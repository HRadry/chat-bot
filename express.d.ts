import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      processedData?: any; // Define el tipo de processedData según tus necesidades
    }
  }
}
