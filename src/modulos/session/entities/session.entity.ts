import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "session" })

export class SessionEntity extends BaseEntity {

  @Column({ type: 'text' })
  userName!: string;

  @Column({ type: 'varchar' })
  codigo!: string;

  @Column({ type: 'timestamptz' })
  initDate!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  finishDate!: Date;

  @Column({ type: 'text' })
  accountId!: string;

  @Column({ type: 'boolean' })
  isValidate!: boolean;

  @Column({type: 'varchar', nullable: true })
  dfsp!: string;

  @Column({ type: 'varchar' })
  partyIdentifier!: string;

  @Column({ type: 'varchar' })
  status!: string;
}

