import { Router } from "express"

export class RouterBase<G> {
  public router: Router;
  public controller: G;

  constructor(GController:{new(): G}){
    this.router = Router();
    this.controller = new GController();
    this.routes();
  }

  routes(){

  }
}