import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EnterpriseRepositoryPort } from 'src/modules/enterprise/application/ports/enterprise.repository.port';
import { Enterprise } from 'src/modules/enterprise/domain/models/entity/enterprise.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EnterpriseRepository implements EnterpriseRepositoryPort {
  constructor(
    @InjectRepository(Enterprise)
    private readonly ormRepository: Repository<Enterprise>,
  ) {}

  async saveEnterprise(enterprise: Enterprise): Promise<Enterprise> {
    return this.ormRepository.save(enterprise);
  }

  async findAllEnterprises(): Promise<Enterprise[]> {
    return this.ormRepository.find();
  }

  async findByEnterpriseId(id: string): Promise<Enterprise | null> {
    return this.ormRepository.findOne({ where: { id } });
  }
}
