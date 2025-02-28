import { Inject, Injectable, Logger } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../../application/ports/enterprise.repository.port';
import {
  Enterprise,
  EnterpriseType,
} from 'src/enterprise/domain/models/entity/enterprise.entity';
import { v4 as uuidv4 } from 'uuid';
import { ValidationUtils } from '../utils/validations.utils';

@Injectable()
export class EnterpriseService {
  private readonly logger = new Logger(ValidationUtils.name);
  constructor(
    @Inject('EnterpriseRepositoryPort')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async createEnterprise(
    name: string,
    type: string,
    taxId: string,
  ): Promise<Enterprise> {
    if (!ValidationUtils.isValidEnterpriseType(type)) {
      this.logger.error(
        `Invalid enterprise type: ${type} for enterprise: ${name}`,
      );
      throw new Error(`Invalid enterprise type: ${type}`);
    }

    if (!ValidationUtils.isValidTaxId(taxId)) {
      this.logger.error(`Invalid taxId: ${taxId} for enterprise: ${name}`);
      throw new Error(`Invalid taxId: ${taxId}`);
    }

    const newEnterprise = new Enterprise(
      uuidv4(), // Generate a random UUID
      name,
      type as EnterpriseType,
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
}
