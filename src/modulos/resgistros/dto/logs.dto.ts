import { IsOptional, IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base.dto";

export class LogDTO extends BaseDTO {

  @IsNotEmpty()
  fechahoraconsulta!: Date;

  @IsNotEmpty()
  fechahorarespuesta!: Date;

  @IsNotEmpty()
  status!: string;
  
  @IsOptional()
  session!: string;

  @IsNotEmpty()
  request!: string;

  @IsNotEmpty()
  response!: string;

  @IsNotEmpty()
  message!: string;
}
