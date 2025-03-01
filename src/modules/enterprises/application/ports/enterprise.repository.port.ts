import { Enterprise } from 'src/modules/enterprises/domain/models/entity/enterprise.entity';

export interface EnterpriseRepositoryPort {
  saveEnterprise(enterprise: Enterprise): Promise<Enterprise>;
  findAllEnterprises(): Promise<Enterprise[]>;
  findByEnterpriseId(enterpriseId: string): Promise<Enterprise | null>;
}
