import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";

export class BaseDTO {
  @IsUUID()
  id!: string;

  @IsDate()
  @IsOptional()
  createdAt!: Date;

  @IsDate()
  @IsOptional()
  updatedAt!: Date;
}
