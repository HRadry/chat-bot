import { Request, Response } from "express";
import { ConfigServer } from '../../../config/config';
import { SessionService } from "../services/session.service";

  const  sessionService: SessionService = new SessionService();

export class SessionController extends ConfigServer{
      listSession(req: Request, res: Response) {
        consultaSessions(req, res);
      }
}

async function consultaSessions(req: Request,res: Response) {
  const id = req.query.id
    try {
        const transferData: any =  await sessionService.ConsultarSession(id);
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