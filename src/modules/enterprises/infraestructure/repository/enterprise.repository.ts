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

  // Update enterprise details based on its ID
  async updateEnterprise(enterpriseEntity: Enterprise): Promise<Enterprise> {
    // Find the enterprise by its ID
    const enterprise = await this.ormRepository.findOne({
      where: { id: enterpriseEntity.id },
    });

    // If the enterprise does not exist, throw an error
    if (!enterprise) {
      throw new Error(`Enterprise with ID ${enterpriseEntity.id} not found.`);
    }

    // Only update fields that need to be updated (e.g., name, type, taxId)
    enterprise.name = enterpriseEntity.name;
    enterprise.type = enterpriseEntity.type;
    enterprise.taxId = enterpriseEntity.taxId;

    // Update the timestamp for the update
    enterprise.updatedAt = new Date();

    // Save the updated enterprise and return it
    return this.ormRepository.save(enterprise);
  }

  async existsEnterpriseById(enterpriseId: string): Promise<boolean> {
    const count = await this.ormRepository.count({
      where: { id: enterpriseId },
    });
    return count > 0; // Returns true if the enterprise exists, false otherwise
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
    return this.ormRepository.find();
  }

  async findByEnterpriseId(id: string): Promise<Enterprise | null> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['parties'],
    });
  }
}
