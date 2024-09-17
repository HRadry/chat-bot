import { Request } from "express";
import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base.service";
import { BlackListEntity } from "../entities/blackList.entity";
import { BlackListDTO } from "../dto/blackList.dto";
import { LogService } from '../../resgistros/services/logs.service';
const logService: LogService = new LogService();

export class BlackListService extends BaseService<BlackListEntity> {
  constructor() {
    super(BlackListEntity);
  }

  async CrearBlackList(accountId: string, pIdr: string, rs: string, sts: string): Promise<boolean> {
    const finit = new Date();
    let blackListEnty: BlackListDTO | null = null;

    const existingEntry = await this.findByPartyIdentifierAndStatus(pIdr, 'released');
    if (existingEntry) {
      blackListEnty = existingEntry;
      blackListEnty.status = sts;
    } else {
      blackListEnty = new BlackListDTO();
      blackListEnty.accountId = accountId;
      blackListEnty.partyIdentifier = pIdr;
      blackListEnty.reason = rs;
      blackListEnty.status = sts;
    }

    try {
      const data = await this.createBlackList(blackListEnty);
      if (!data) {
        //await logService.CrearLog(finit, blackListEnty, data, null, "createHistory", "ERROR");
        return false;
      }
      await logService.CrearLog(finit, blackListEnty, data, data.id, "createHistory", "COMPLETE");
      return true;
    } catch (e) {
      console.error(e);
      //await logService.CrearLog(finit, blackListEnty, e, null, "createHistory", "ERROR");
      return false;
    }
  }

  async ConsultarBlackList(req: Request, res: any): Promise<any> {
    //const datat = new BlackListDTO();
    const search = req.body.search
    try {
      let data: any
      if (search != "" && search != undefined) {
        data = await this.findBlackListByName(search);
      } else {
        data = await this.findAllBlackLists();
      }
      return data;
    } catch (e) {
      console.error(e);
      return false
    }
  }


  private async findAllBlackLists(): Promise<BlackListEntity[]> {
    return (await this.execRepository).find();
  }
  private async findBlackListById(id: string): Promise<BlackListEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  public async findByPartyIdentifier(partyIdentifier: string): Promise<BlackListEntity | null> {
    return (await this.execRepository).findOneBy({ partyIdentifier });
  }

  public async findByPartyIdentifierAndStatus(partyIdentifier: string, status: string): Promise<BlackListEntity | null> {
    return (await this.execRepository).findOne({
      where: {
        partyIdentifier: partyIdentifier,
        status: status
      }
    });
  }


  private async findBlackListByName(
    search:
      | string
  ): Promise<BlackListEntity[] | []> {

    
    return (await this.execRepository)
      .createQueryBuilder("blackList_consultas_isis")
      .where("blackList_consultas_isis.sp_response ilike '%search%' OR blackList_consultas_isis.sp_request ilike '%search%' ", {
        search: `%${search}%`,
      })
      .getMany();
  }

  private async createBlackList(body: BlackListDTO): Promise<BlackListEntity> {
    return (await this.execRepository).save(body);
  }

  private async updateBlackList(
    id: string,
    infoUpdate: BlackListDTO
  ): Promise<UpdateResult> {
    return (await this.execRepository).update(id, infoUpdate);
  }


}
