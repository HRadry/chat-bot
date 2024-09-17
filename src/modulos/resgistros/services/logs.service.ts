import { Request } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { LogEntity } from "../entities/logs.entity";
import { LogDTO } from "../dto/logs.dto";

export class LogService extends BaseService<LogEntity> {
  constructor() {
    super(LogEntity);
  }

  async  CrearLog(finit: Date,rq:any,rp:any,sesion:string,ms:string,sts:string):Promise<boolean>{
    const logEnty = new LogDTO();
    logEnty.fechahoraconsulta = finit
    logEnty.fechahorarespuesta = new Date()
    logEnty.message = ms
    logEnty.request = rq
    logEnty.session = sesion
    logEnty.response = rp
    logEnty.status = sts
      try {
        const data = await this.createLog(logEnty);
        if (!data) {
          return false
        }
        return true;
      } catch (e) {
        console.error(e);
        return false
      }
  }

  async  ConsultarLog(req: Request,res: any):Promise<any>{
    //const datat = new LogDTO();
    const search = req.body.search
    try {
      let data:any
      if (search != "" && search != undefined){
         data = await this.findLogByName(search);
      }else{
         data = await this.findAllLogs();
      }
      return data;
    } catch (e) {
      console.error(e);
      return false
    }
}

private async findAllLogs(): Promise<LogEntity[]> {
  return (await this.execRepository).find();
}
private async findLogById(id: string): Promise<LogEntity | null> {
  return (await this.execRepository).findOneBy({ id });
}

private async findLogByName(
  search:
    | string
): Promise<LogEntity[] | []> {
  return (await this.execRepository)
    .createQueryBuilder("log_consultas_isis")
    .where("log_consultas_isis.sp_response ilike '%search%' OR log_consultas_isis.sp_request ilike '%search%' ", {
      search: `%${search}%`,
    })
    .getMany();
}

private async createLog(body: LogDTO): Promise<LogEntity> {
  return (await this.execRepository).save(body);
}

}

