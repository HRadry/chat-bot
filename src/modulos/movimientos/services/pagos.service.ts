import { UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { Pago } from "../entities/pagos.entity";
import { PagoDTO } from "../dto/pagos.dto";
import { LogService } from '../../resgistros/services/logs.service';
const  logService: LogService = new LogService();

export class PagoService extends BaseService<Pago> {
  constructor() {
    super(Pago);
  }

  async  ConsultarPago(id: string):Promise<Pago>{
    const finit= new Date()
    try {
      let data:any
      if (id != "" && id != undefined){
         data = await this.findPagoById(id);
      }else{
         data = await this.findAllPagos();
      }
      await logService.CrearLog(finit,"findPago",data,id,"ConsultarPago","COMPLETE");
      return data;
    } catch (e) {
      console.error(e);
      await logService.CrearLog(finit,"findPago",e,id,"ConsultarPago","ERROR");
      return null
    }
}

async  CrearPago(datat: PagoDTO):Promise<string>{
  const finit= new Date()
  try {
    const data = await this.createPago(datat);
    if (!data) {
      await logService.CrearLog(finit,datat,data,null,"CrearPago","ERROR");
      return null
    }
    await logService.CrearLog(finit,datat,data,data.id,"CrearPago","COMPLETE");
    return data.id;
  } catch (e) {
    console.error(e);
    await logService.CrearLog(finit,datat,e,null,"CrearPago","ERROR");
    return null
  }
}

private async  findAllPagos(): Promise<Pago[]> {
  return (await this.execRepository).find();
}
private async  findPagoById(id: string): Promise<Pago | null> {
  return (await this.execRepository).findOneBy({ id });
}
private async  findPagoByPagoId(id: string): Promise<Pago | null> {
  return (await this.execRepository).findOneBy({ id });
}
private async  findPagoByName(
  pagoId:
    | string
): Promise<Pago[] | []> {
  return (await this.execRepository)
    .createQueryBuilder("pago")
    .where("pago.pagoId like :pagoId", {
      pagoId: `%${pagoId}%`,
    })
    .getMany();
}

private async  createPago(body: PagoDTO): Promise<Pago> {
  return (await this.execRepository).save(body);
}

private async  updatePago(
  id: string,
  infoUpdate: PagoDTO
): Promise<UpdateResult> {
  return (await this.execRepository).update(id, infoUpdate);
}
}



