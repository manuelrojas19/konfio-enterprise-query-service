import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterpriseRepositoryPort } from 'src/modules/enterprises/application/ports/enterprise.repository.port';
import { Enterprise } from 'src/modules/enterprises/domain/models/entity/enterprise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnterpriseRepository implements EnterpriseRepositoryPort {
  constructor(
    @InjectRepository(Enterprise)
    private readonly ormRepository: Repository<Enterprise>,
  ) {}

  async existsEnterpriseById(enterpriseId: string): Promise<boolean> {
    const count = await this.ormRepository.count({
      where: { id: enterpriseId },
    });
    return count > 0;  // Returns true if the enterprise exists, false otherwise
  }

  async findAllEnterprisesByPartyId(partyId: string): Promise<Enterprise[]> {
    return this.ormRepository
      .createQueryBuilder('enterprise')
      .innerJoin('enterprise.parties', 'party')
      .where('party.id = :partyId', { partyId })
      .getMany();
  }
  
  async saveEnterprise(enterprise: Enterprise): Promise<Enterprise> {
    return this.ormRepository.save(enterprise);
  }

  async findAllEnterprises(): Promise<Enterprise[]> {
    return this.ormRepository.find({
      relations: ['parties'], // Load related parties for each enterprise
    });
  }
  
  async findByEnterpriseId(id: string): Promise<Enterprise | null> {
    return this.ormRepository.findOne({ where: { id } });
  }
}
