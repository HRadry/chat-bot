import { Request } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { HistoryEntity } from "../entities/history.entity";
import { HistoryDTO } from "../dto/history.dto";
import { LogService } from '../../resgistros/services/logs.service';
const logService: LogService = new LogService();
export class HistoryService extends BaseService<HistoryEntity> {
  constructor() {
    super(HistoryEntity);
  }

  async CrearHistory(mType: string, mId: string, oNumber: string, dNumber: string, dName: string, ms: string, sts: string): Promise<boolean> {
    const finit = new Date()
    const historyEnty = new HistoryDTO();
    historyEnty.movementType = mType
    historyEnty.movementId = mId
    historyEnty.originNumber = oNumber
    historyEnty.destination_number = dNumber
    historyEnty.destination_name = dName
    historyEnty.message = ms
    historyEnty.status = sts

    try {
      const data = await this.createHistory(historyEnty);
      if (!data) {
        await logService.CrearLog(finit, historyEnty, data, null, "createHistory", "ERROR");
        return false
      }
      await logService.CrearLog(finit, historyEnty, data, data.id, "createHistory", "COMPLETE");
      return true;
    } catch (e) {
      console.error(e);
      await logService.CrearLog(finit, historyEnty, e, null, "createHistory", "ERROR");
      return false
    }
  }

  async ConsultarHistory(req: Request, res: any): Promise<any> {
    const search = req.body.search
    try {
      let data: any
      if (search != "" && search != undefined) {
        data = await this.findHistoryByName(search);
      } else {
        data = await this.findAllHistorys();
      }
      return data;
    } catch (e) {
      console.error(e);
      return false
    }
  }


  private async findAllHistorys(): Promise<HistoryEntity[]> {
    return (await this.execRepository).find();
  }
  private async findHistoryById(id: string): Promise<HistoryEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  private async findHistoryByName(
    search:
      | string
  ): Promise<HistoryEntity[] | []> {
    return (await this.execRepository)
      .createQueryBuilder("history")
      .where("history.message ilike '%search%' OR history.movement_type ilike '%search%' ", {
        search: `%${search}%`,
      })
      .getMany();
  }

  private async createHistory(body: HistoryDTO): Promise<HistoryEntity> {
    return (await this.execRepository).save(body);
  }

  // Método para obtener destinatarios recurrentes
  async findRecurrence(userId: string): Promise<HistoryEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder("history")
      .select("destination_number, destination_name, COUNT(*) as count")
      .where("origin_number = :userId", { userId })
      .andWhere("movement_type = :movementType", { movementType: "TRANSFERENCIA" })
      .groupBy("destination_number, destination_name")
      .orderBy("count", "DESC")
      .limit(3)
      .getRawMany();
  }


  // Método para obtener los últimos 5 movimientos
  async findLastMovements(userId: string): Promise<HistoryEntity[]> {
    console.log("userId:: ", userId)
    return (await this.execRepository)
      .createQueryBuilder("history")
      .where("origin_number = :userId", { userId })
      .orderBy("created_at", "DESC")
      .limit(5)
      .getMany();
  }

}
