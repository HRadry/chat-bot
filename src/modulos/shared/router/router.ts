import { Router } from "express";

export class RouterBase<G,M> {
  public router: Router;
  public controller: G;
  public middleware: M;
  constructor(GController: { new (): G }, MMiddleware: { new (): M }) {
    this.router = Router();
    this.controller = new GController();
    this.middleware = new MMiddleware();
    this.routes();
  }

  routes() {}
}
