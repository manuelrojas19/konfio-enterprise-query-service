import { Inject, Injectable, Logger } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../ports/enterprise.repository.port';

import { ValidationUtils } from '../utils/validations.utils';
import {
  EnterpriseDto,
  EnterpriseType,
} from 'src/modules/enterprises/domain/models/dto/enterprise.dto';
import { Enterprise } from 'src/modules/enterprises/domain/models/entity/enterprise.entity';
import MapperUtils from '../utils/mapper.utils';


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
  ): Promise<EnterpriseDto> {
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

    const newEnterprise = new Enterprise(name, type as EnterpriseType, taxId);
    const savedEnterprise =
      await this.enterpriseRepository.saveEnterprise(newEnterprise);
    return MapperUtils.enterpriseEntityToDto(savedEnterprise);
  }

  async findById(enterpriseId: string): Promise<EnterpriseDto | null> {
    const enterprise =
      await this.enterpriseRepository.findByEnterpriseId(enterpriseId);

    // Map enterprise entity to an EnterpriseDto
    return MapperUtils.enterpriseEntityToDto(enterprise!);
  }

  async findAll(): Promise<EnterpriseDto[] | null> {
    const enterprises = await this.enterpriseRepository.findAllEnterprises();

    // Map each enterprise entity to an EnterpriseDto
    return enterprises.map((e) => MapperUtils.enterpriseEntityToDto(e));
  }
}
