import { Column, Entity } from "typeorm";
import { BaseEntity } from "../../../config/base.entity";

@Entity({ name: "log" })

export class LogEntity extends BaseEntity {
  @Column({ type: 'timestamp' })
  fechahoraconsulta!: Date;

  @Column({ type: 'timestamp' })
  fechahorarespuesta!: Date;

  @Column({ type: 'varchar' })
  status!: string;

  @Column({ type: 'varchar', nullable: true  })
  session!: string;

  @Column({ type: 'text' })
  request!: string;

  @Column({ type: 'text' })
  response!: string;

  @Column({ type: 'text' })
  message!: string;

}
