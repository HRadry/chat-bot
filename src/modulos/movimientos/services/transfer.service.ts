
import {UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { Transfer } from "../entities/transfer.entity";
import { TransferDTO } from "../dto/transfer.dto";
import { LogService } from '../../resgistros/services/logs.service';
const  logService: LogService = new LogService();

export class TransferService extends BaseService<Transfer> {
  constructor() {
    super(Transfer);
  }

  async  ConsultarTransfer(id: string):Promise<Transfer>{
    const finit= new Date()
    try {
      let data:any
      if (id != "" && id != undefined){
         data = await this.findTransferById(id);
      }else{
         data = await this.findAllTransfers();
      }
      await logService.CrearLog(finit,"findTransfer",data,id,"ConsultarTransfer","COMPLETE");
      return data;
    } catch (e) {
      console.error(e);
      await logService.CrearLog(finit,"findTransfer",e,id,"ConsultarTransfer","ERROR");
      return null
    }
}

async  CrearTransfer(txId: string, acId: string, monto: string, oNumber: string, destNumber: string, sessionId:string,sttatus: string):Promise<string>{
  const transferData = new TransferDTO();
  transferData.transferId = txId;
  transferData.accountId = acId;
  transferData.monto = parseFloat(monto);
  transferData.originNumber = oNumber;
  transferData.destinationNumber = destNumber;
  transferData.sessionId = sessionId;
  transferData.status = sttatus;
  const finit= new Date()
  try {
    const data = await this.createTransfer(transferData);
    if (!data) {
      await logService.CrearLog(finit,transferData,data,null,"CrearTransfer","ERROR");
      return null
    }
    await logService.CrearLog(finit,transferData,data,data.id,"CrearTransfer","COMPLETE");
    return data.id;
  } catch (e) {
    console.error(e);
    await logService.CrearLog(finit,transferData,e,null,"CrearTransfer","ERROR");
    return null
  }
}


private async  findAllTransfers(): Promise<Transfer[]> {
  return (await this.execRepository).find();
}
private async  findTransferById(id: string): Promise<Transfer | null> {
  return (await this.execRepository).findOneBy({ id });
}
private async  findTransferByTransferId(transferId: string): Promise<Transfer | null> {
  return (await this.execRepository).findOneBy({ transferId });
}
private async  findTransferByName(
  transferId:
    | string
): Promise<Transfer[] | []> {
  return (await this.execRepository)
    .createQueryBuilder("transfer")
    .where("transfer.transferId like :transferId", {
      transferId: `%${transferId}%`,
    })
    .getMany();
}

private async createTransfer(body: TransferDTO): Promise<Transfer> {
  return (await this.execRepository).save(body);
}

private async  updateTransfer(
  id: string,
  infoUpdate: TransferDTO
): Promise<UpdateResult> {
  return (await this.execRepository).update(id, infoUpdate);
}


}


