import { Request, Response } from 'express';

const verifyWebhook = (req: Request, res: Response): void => {
    // Parsear los parámetros de la query string
    const mode: string | undefined = req.query["hub.mode"] as string;
    const token: string | undefined = req.query["hub.verify_token"] as string;
    const challenge: string | undefined = req.query["hub.challenge"] as string;
    
    // Verificar si el modo y el token están presentes en la query string
    if (token) {
        console.log('Entró a verificación');

        // Verificar si el modo y el token son los esperados
        if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
            // Responder con el token de desafío de la solicitud
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            // Responder con '403 Forbidden' si el token no coincide
            res.sendStatus(403);
        }
    } else {
        // Responder con '400 Bad Request' si faltan los parámetros
        res.sendStatus(400);
    }
};

export { verifyWebhook };
