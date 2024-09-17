import { IsOptional, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base.dto";

export class HistoryDTO extends BaseDTO {

  @IsNotEmpty()
  movementType!: string;

  @IsNotEmpty()
  movementId!: string;

  @IsNotEmpty()
  originNumber!: string;

  @IsOptional()
  destination_number!: string;

  @IsOptional()
  destination_name!: string;

  @IsNotEmpty()
  message!: string;

  @IsNotEmpty()
  status!: string;
}
