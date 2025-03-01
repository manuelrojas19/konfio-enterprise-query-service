import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { EnterpriseType } from '../dto/enterprise.dto';
// Assume you have this enum defined elsewhere

@Entity()
export class Enterprise {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 60 })
  name: string;

  @Column({ type: 'enum', enum: EnterpriseType })
  type: EnterpriseType;

  @Column({ type: 'varchar', length: 20 })
  taxId: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  // Constructor for initializing the entity
  constructor(name: string, type: EnterpriseType, taxId: string) {
    this.name = name;
    this.type = type;
    this.taxId = taxId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
