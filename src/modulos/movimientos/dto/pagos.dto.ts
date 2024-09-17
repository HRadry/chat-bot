import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base.dto";

export class PagoDTO extends BaseDTO {
  @IsNotEmpty()
  transferId!: string;

  @IsNotEmpty()
  accountId!: string;

  @IsNotEmpty()
  monto!: number;

  @IsNotEmpty()
  originNumber!: string;

  @IsNotEmpty()
  destinationNumber!: string;

  @IsNotEmpty()
  sessionId!: string;

  @IsNotEmpty()
  status!: string;
}
