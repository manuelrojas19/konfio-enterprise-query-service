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
    // Find Existing party
    const existingParty = await this.ormRepository.findOne({
      where: { id: party.id },
    });

    // If the enterprise does not exist, throw an error
    if (!existingParty) {
      throw new Error(`Party with ID ${party.id} not found.`);
    }

    // Only update fields that need to be updated (e.g., name, type, taxId)
    existingParty.name = party.name;
    // Update the timestamp for the update
    existingParty.updatedAt = new Date();

    return this.ormRepository.save(existingParty); // TypeORM's `save()` updates if entity exists
  }

  async findAllPartiesByEnterpriseId(enterpriseId: string): Promise<Party[]> {
    return this.ormRepository
      .createQueryBuilder('party')
      .innerJoin('party.enterprises', 'enterprise')
      .where('enterprise.id = :enterpriseId', { enterpriseId })
      .getMany();
  }
}
