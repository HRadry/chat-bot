import { RouterBase } from "../shared/router/router001";
import { LogController } from "./controllers/log.controller";

export class SPSRouter extends RouterBase<LogController>{
    constructor(){
        super(LogController)
    }
    routes(): void {
      this.router.get('/loglist', (req, res)=> this.controller.list(req, res));
    }
}