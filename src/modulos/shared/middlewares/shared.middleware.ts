import { NextFunction, Request, Response } from "express";
import { HttpResponse } from "../response/http.response";

export class SharedMiddleware {
    constructor(public httpResponse: HttpResponse = new HttpResponse()) {}
}
