import { EntityTarget, Repository } from "typeorm";
import { UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { SessionEntity } from "../entities/session.entity";
import { SessionDTO } from "../dto/session.dto";
import { LogService } from '../../resgistros/services/logs.service';
const  logService: LogService = new LogService();

export class SessionService extends BaseService<SessionEntity> {
  //public execRepository: Promise<Repository<T>>;
  constructor() {
    super(SessionEntity);
  }

  async  ConsultarSession(id: string):Promise<SessionEntity>{
    const finit= new Date()
    try {
      let data:any
      if (id != "" && id != undefined){
         data = await this.findSessionById(id);
      }else{
         data = await this.findAllSessions();
      }
       await logService.CrearLog(finit,"findSession",data,id,"ConsultarSession","COMPLETE");
      return data;
    } catch (e) {
      console.error(e);
      await logService.CrearLog(finit,"findSession",e,id,"ConsultarSession","ERROR");
      return null
    }
}

async  CrearSession(accountId: string,code: string,number: string,userName:string,dfsp:string):Promise<SessionDTO | Error>{
  const finit= new Date()
  const datat = new SessionDTO();
  datat.userName = userName
  datat.accountId = accountId
  datat.codigo = code
  datat.initDate = finit
  datat.partyIdentifier = number
  datat.dfsp = dfsp
  datat.status = 'ACTIVA'
  datat.isValidate = false
  try {
    const data = await this.createSession(datat);
    if (!data) {
      await logService.CrearLog(finit,datat,data,null,"CrearSession","ERROR");
      return null
    }
    await logService.CrearLog(finit,datat,data,data.id,"CrearSession","COMPLETE");
    return data;
  } catch (e) {
    console.error(e);
    await logService.CrearLog(finit,datat,e,null,"CrearSession","ERROR");
    return e
  }
}

async  CrearSimple(number: string,userName:string):Promise<string>{
  const finit= new Date()
  const datat = new SessionDTO();
  datat.userName = userName
  datat.accountId = ''
  datat.codigo = ''
  datat.initDate = new Date()
  datat.finishDate = new Date()
  datat.partyIdentifier = number
  datat.isValidate = false
  datat.status = 'SIN REGISTRO'
  try {
    const data = await this.createSession(datat);
    if (!data) {
      await logService.CrearLog(finit,datat,data,null,"CrearSession","ERROR");
      return ""
    }
    await logService.CrearLog(finit,datat,data,data.id,"CrearSession","COMPLETE");
    return data.id;
  } catch (e) {
    console.error(e);
    await logService.CrearLog(finit,datat,e,null,"CrearSession","ERROR");
    return ""
  }
}

async  CerrarSession(session_id:string):Promise<boolean>{
  const finit= new Date()
  const datat = new SessionDTO();
  datat.finishDate = new Date()
  datat.status = 'CERRADA'
  try {
    const data = await this.updateSession(session_id,datat);
    if (!data) {
      await logService.CrearLog(finit,datat,data,null,"CerrarSession","ERROR");
      return false
    }
    await logService.CrearLog(finit,datat,data,session_id,"CerrarSession","COMPLETE");
    return true;
  } catch (e) {
    console.error(e);
    await logService.CrearLog(finit,datat,e,null,"CerrarSession","ERROR");
    return false
  }
}


private async findAllSessions(): Promise<SessionEntity[]> {
  return (await this.execRepository).find();
}
private async findSessionById(id: string): Promise<SessionEntity | null> {
  return (await this.execRepository).findOneBy({ id });
}

private async createSession(body: SessionDTO): Promise<SessionEntity> {
  return (await this.execRepository).save(body);
}

private async updateSession(
  id: string,
  infoUpdate: SessionDTO
): Promise<UpdateResult> {
  return (await this.execRepository).update(id, infoUpdate);
}

}