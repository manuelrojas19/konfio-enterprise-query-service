import { Enterprise } from '../../domain/models/entity/enterprise.entity';

export interface EnterpriseRepositoryPort {
  save(party: Enterprise): Promise<Enterprise>;
  findAll(): Promise<Enterprise[]>;
  findByEnterpriseId(enterpriseId: string): Promise<Enterprise>;
}
