import { Inject, Injectable, Logger } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../ports/enterprise.repository.port';

import { ValidationUtils } from '../utils/validations.utils';
import {
  EnterpriseDto,
  EnterpriseType,
} from 'src/modules/enterprises/domain/models/dto/enterprise.dto';
import { Enterprise } from 'src/modules/enterprises/domain/models/entity/enterprise.entity';
import MapperUtils from '../utils/mapper.utils';
import { UpdateEnterpriseDto } from '../../domain/models/dto/updateEnterprise.dto';
import { CreateEnterpriseDto } from '../../domain/models/dto/createEnterprise.dto';

@Injectable()
export class EnterpriseService {
  private readonly logger = new Logger(ValidationUtils.name);
  constructor(
    @Inject('EnterpriseRepositoryPort')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async createEnterprise(
    createEnterpriseDto: CreateEnterpriseDto,
  ): Promise<EnterpriseDto> {
    if (!ValidationUtils.isValidEnterpriseType(createEnterpriseDto.type)) {
      this.logger.error(
        `Invalid enterprise type: ${createEnterpriseDto.type} for enterprise: ${name}`,
      );
      throw new Error(`Invalid enterprise type: ${createEnterpriseDto.type}`);
    }

    if (!ValidationUtils.isValidTaxId(createEnterpriseDto.taxId)) {
      this.logger.error(
        `Invalid taxId: ${createEnterpriseDto.taxId} for enterprise: ${name}`,
      );
      throw new Error(`Invalid taxId: ${createEnterpriseDto.taxId}`);
    }

    const newEnterprise = new Enterprise(
      createEnterpriseDto.name,
      createEnterpriseDto.type as EnterpriseType,
      createEnterpriseDto.taxId,
    );
    const savedEnterprise =
      await this.enterpriseRepository.saveEnterprise(newEnterprise);
    return MapperUtils.enterpriseEntityToDto(savedEnterprise);
  }

  async updateEnterprise(
    updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<EnterpriseDto> {
    if (!ValidationUtils.isValidEnterpriseType(updateEnterpriseDto.type)) {
      this.logger.error(
        `Invalid enterpris while updating type: ${updateEnterpriseDto.type} for enterprise: ${updateEnterpriseDto.name}`,
      );
      throw new Error(`Invalid enterprise type: ${updateEnterpriseDto.type}`);
    }

    if (!ValidationUtils.isValidTaxId(updateEnterpriseDto.taxId)) {
      this.logger.error(
        `Invalid taxId: ${updateEnterpriseDto.taxId} for enterprise: ${updateEnterpriseDto.name}`,
      );
      throw new Error(`Invalid taxId: ${updateEnterpriseDto.taxId}`);
    }

    const adjustedEnterprise = new Enterprise(
      updateEnterpriseDto.name,
      updateEnterpriseDto.type as EnterpriseType,
      updateEnterpriseDto.taxId,
    );
    adjustedEnterprise.id = updateEnterpriseDto.id;
    const updatedEntity =
      await this.enterpriseRepository.updateEnterprise(adjustedEnterprise);
    return MapperUtils.enterpriseEntityToDto(updatedEntity);
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

  async findAllByPartyId(partyId: string): Promise<EnterpriseDto[] | null> {
    const enterprises =
      await this.enterpriseRepository.findAllEnterprisesByPartyId(partyId);

    // Map each enterprise entity to an EnterpriseDto
    return enterprises.map((e) => MapperUtils.enterpriseEntityToDto(e));
  }
}
