import { Request, Response } from "express";
import { ConfigServer } from '../../../config/config';
import { LogService } from "../services/logs.service";

  const  logService: LogService = new LogService();

export class LogController extends ConfigServer{
      list(req: Request, res: Response) {
        consultaLogs(req, res);
      }
}

async function consultaLogs(req: Request,res: Response) {
    try {
        const transferData: any =  await logService.ConsultarLog(req,res);
         res.status(200).json({
            result:transferData,
          })
  } catch (error) {
    console.error('Error to load data:', error);
    const response = {
      code: "1000",
      name: "Communication error",
      description: "Generic communication error."
    }
    res.status(500).json(response);
  }

}