import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { EnterpriseType } from '../dto/enterprise.dto';
import { Party } from 'src/modules/parties/domain/entity/party.entity';
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

  @ManyToMany(() => Party, (party) => party.enterprises)
  @JoinTable()
  parties: Party[];

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
