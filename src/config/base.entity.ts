import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


export abstract class BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  updatedAt!: Date;

  constructor(id: string) {
    this.id = id;
  }

  @BeforeInsert()
  generateIdAndCoreBanc() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }

}

