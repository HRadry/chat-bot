import { IsOptional, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base.dto";

export class BlackListDTO extends BaseDTO {

  @IsNotEmpty()
  accountId!: string;

  @IsNotEmpty()
  partyIdentifier!: string;

  @IsOptional()
  reason!: string;

  @IsNotEmpty()
  status!: string;
}
