import { RouterBase } from "../shared/router/router001";
import { SessionController } from "./controllers/session.controller";

export class SPSRouter extends RouterBase<SessionController>{
    constructor(){
        super(SessionController)
    }
    routes(): void {
      this.router.get('/sessionlist', (req, res)=> this.controller.listSession(req, res));
    }
}