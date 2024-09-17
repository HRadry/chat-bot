import { IsOptional, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base.dto";

export class SessionDTO extends BaseDTO {

  @IsNotEmpty()
  userName!: string;

  @IsNotEmpty()
  codigo!: string;

  @IsNotEmpty()
  initDate!: Date;

  @IsOptional()
  finishDate!: Date;

  @IsNotEmpty()
  accountId!: string;
  
  @IsNotEmpty()
  isValidate!: boolean;

  @IsOptional()
  dfsp!: string;

  @IsNotEmpty()
  partyIdentifier!: string;

  @IsNotEmpty()
  status!: string;
  
}
