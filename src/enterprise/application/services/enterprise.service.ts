import { Inject, Injectable } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../../application/ports/enterprise.repository.port';
import { Enterprise } from 'src/enterprise/domain/models/entity/enterprise.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EnterpriseService {
  constructor(
    @Inject('EnterpriseRepositoryPort')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async createEnterprise(
    name: string,
    type: string,
    taxId: string,
  ): Promise<Enterprise> {
    const newEnterprise = new Enterprise(
      uuidv4(), // Generate a random UUID
      name,
      type,
      taxId,
      new Date(),
      new Date(),
    );
    return this.enterpriseRepository.save(newEnterprise);
  }

  async findById(enterpriseId: string): Promise<Enterprise | null> {
    const enterprise =
      await this.enterpriseRepository.findByEnterpriseId(enterpriseId);
    return enterprise;
  }

  async findAll(): Promise<Enterprise[] | null> {
    const enterprise = await this.enterpriseRepository.findAll();
    return enterprise;
  }

  // Otros casos de uso como update, delete, etc.
}
