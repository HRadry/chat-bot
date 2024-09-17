import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "black_list" })

export class BlackListEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  accountId!: string;

  @Column({ type: 'text' })
  partyIdentifier!: string;

  @Column({ type: 'text', nullable: true  })
  reason!: string;

  @Column({ type: 'text' })
  status!: string;
}



