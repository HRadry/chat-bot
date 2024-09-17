import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base.dto";
import { Double } from "typeorm";

export class ConsultaDTO extends BaseDTO {

  @IsNotEmpty()
  accountId!: string;

  @IsNotEmpty()
  monto!: string;

  @IsNotEmpty()
  originNumber!: string;

  @IsNotEmpty()
  sessionId!: string;

  @IsNotEmpty()
  status!: string;
}
