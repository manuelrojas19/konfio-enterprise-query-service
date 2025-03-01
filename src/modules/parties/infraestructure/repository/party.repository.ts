import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Party } from '../../domain/entity/party.entity';
import { PartyRepositoryPort } from '../../application/ports/party.repository.port';

@Injectable()
export class PartyRepository implements PartyRepositoryPort {
  constructor(
    @InjectRepository(Party)
    private readonly ormRepository: Repository<Party>,
  ) {}

  async saveParty(party: Party): Promise<Party> {
    return this.ormRepository.save(party);
  }

  async updateParty(party: Party): Promise<Party> {
    return this.ormRepository.save(party); // TypeORM's `save()` updates if entity exists
  }

  async findAllPartiesByEnterpriseId(enterpriseId: string): Promise<Party[]> {
    return this.ormRepository
      .createQueryBuilder('party')
      .innerJoin('party.enterprises', 'enterprise')
      .where('enterprise.id = :enterpriseId', { enterpriseId })
      .getMany();
  }
}
