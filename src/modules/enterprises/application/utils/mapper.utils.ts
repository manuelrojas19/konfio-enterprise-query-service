import { EnterpriseDto } from 'src/modules/enterprises/domain/models/dto/enterprise.dto';
import { Enterprise } from 'src/modules/enterprises/domain/models/entity/enterprise.entity';

export class MapperUtils {
  // Mapper function to convert from Entity to DTO
  static enterpriseEntityToDto(enterprise: Enterprise): EnterpriseDto {
    return new EnterpriseDto(
      enterprise.id,
      enterprise.name,
      enterprise.type,
      enterprise.taxId,
      enterprise.createdAt,
      enterprise.updatedAt,
    );
  }

  // Mapper function to convert from DTO to Entity (if needed)
  static enterpriseDtoEntity(enterpriseDto: EnterpriseDto): Enterprise {
    const enterprise = new Enterprise(
      enterpriseDto.name,
      enterpriseDto.type,
      enterpriseDto.taxId,
    );
    enterprise.id = enterpriseDto.id;
    enterprise.createdAt = enterpriseDto.createdAt;
    enterprise.updatedAt = enterpriseDto.updatedAt;
    return enterprise;
  }
}
