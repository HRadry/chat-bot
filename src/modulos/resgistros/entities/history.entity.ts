import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "history" })

export class HistoryEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  movementType!: string;

  @Column({ type: 'text' })
  movementId!: string;

  @Column({ type: 'varchar' })
  originNumber!: string;

  @Column({ type: 'varchar' , nullable: true })
  destination_number!: string;

  @Column({ type: 'varchar' , nullable: true })
  destination_name!: string;

  @Column({ type: 'text' })
  message!: string;

  @Column({ type: 'text' })
  status!: string;
}
