import * as dotenv from "dotenv"
import { DataSource } from "typeorm";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
    constructor(){
        const nodeNameEnv = this.createPathEnv(this.nodeEnv);
        dotenv.config({
            path:nodeNameEnv,
        });
    }

    public getEnviroment(v:string):string | undefined{
        return process.env[v]
    }

    public getNumberEnv(v: string): number{
        return Number(this.getEnviroment(v));
    }

    public get nodeEnv(): string{
        return this.getEnviroment('NODE_ENV')?.trim() || "" ;
    }
    
    public createPathEnv(path:string): string {
        const arrayEnv: Array<string> = ['env']
        if (path.length > 0){
            const stringToArray = path.split(".");
            arrayEnv.unshift(...stringToArray);
        }
        return '.'+ arrayEnv.join('.')
    }

    get initConnect(): Promise<DataSource> {
        return AppDataSource.initialize();
    }
}
