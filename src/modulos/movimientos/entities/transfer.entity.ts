import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";


@Entity({ name: "transfer" })
export class Transfer extends BaseEntity {
  @Column({ type: 'varchar' })
  transferId!: string;

  @Column({ type: 'varchar' })
  accountId!: string;

  @Column({ type: 'float' })
  monto!: number;
  
  @Column({ type: 'varchar' })
  originNumber!: string;

  @Column({ type: 'varchar' })
  destinationNumber!: string;

  @Column({ type: 'text' })
  sessionId!: string;

  @Column({ type: 'text' })
  status!: string;
}
