import { Enterprise } from 'src/modules/enterprises/domain/models/entity/enterprise.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Party {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @ManyToMany(() => Enterprise, (enterprise) => enterprise.parties)
  enterprises: Enterprise[];

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  constructor(name: string) {
    this.name = name;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
