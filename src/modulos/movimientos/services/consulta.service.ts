import { Double, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { Consulta } from "../entities/consulta.entity";
import { ConsultaDTO } from "../dto/consulta.dto";
import { LogService } from '../../resgistros/services/logs.service';
const logService: LogService = new LogService();

export class ConsultaService extends BaseService<Consulta> {
  constructor() {
    super(Consulta);
  }

  async ConsultarConsulta(id: string): Promise<Consulta> {
    const finit = new Date()
    try {
      let data: any
      if (id != "" && id != undefined) {
        data = await this.findConsultaById(id);
      } else {
        data = await this.findAllConsultas();
      }
      await logService.CrearLog(finit, "findConsulta", data, id, "ConsultarConsulta", "COMPLETE");
      return data;
    } catch (e) {
      console.error(e);
      await logService.CrearLog(finit, "findConsulta", e, id, "ConsultarConsulta", "ERROR");
      return null
    }
  }

  async CrearConsulta(acId: string, monto: string, sessionId: string, oNumber: string, status: string): Promise<string> {
    const c = new ConsultaDTO()
    c.accountId = acId
    c.monto = monto
    c.sessionId = sessionId
    c.status = status
    c.originNumber = oNumber
    const finit = new Date()
    try {
      const data = await this.createConsulta(c);
      if (!data) {
        await logService.CrearLog(finit, c, data, null, "CrearConsulta", "ERROR");
        return ''
      }
      await logService.CrearLog(finit, c, data, data.id, "CrearConsulta", "COMPLETE");
      return data.id;
    } catch (e) {
      console.error(e);
      await logService.CrearLog(finit, c, e, null, "CrearConsulta", "ERROR");
      return ''
    }
  }

  private async findAllConsultas(): Promise<Consulta[]> {
    return (await this.execRepository).find();
  }
  private async findConsultaById(id: string): Promise<Consulta | null> {
    return (await this.execRepository).findOneBy({ id });
  }
  private async findConsultaByConsultaId(id: string): Promise<Consulta | null> {
    return (await this.execRepository).findOneBy({ id });
  }
  private async findConsultaByName(
    consultaId:
      | string
  ): Promise<Consulta[] | []> {
    return (await this.execRepository)
      .createQueryBuilder("consulta")
      .where("consulta.consultaId like :consultaId", {
        consultaId: `%${consultaId}%`,
      })
      .getMany();
  }

  private async createConsulta(body: ConsultaDTO): Promise<Consulta> {
    return (await this.execRepository).save(body);
  }

  private async updateConsulta(
    id: string,
    infoUpdate: ConsultaDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }
}
