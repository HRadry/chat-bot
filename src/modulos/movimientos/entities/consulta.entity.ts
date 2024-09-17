import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";


@Entity({ name: "consulta" })
export class Consulta extends BaseEntity {

  @Column({ type: 'varchar' })
  accountId!: string;

  @Column({ type: 'text' })
  monto!: string;
  
  @Column({ type: 'varchar' })
  originNumber!: string;

  @Column({ type: 'text' })
  sessionId!: string;

  @Column({ type: 'text' })
  status!: string;
}
