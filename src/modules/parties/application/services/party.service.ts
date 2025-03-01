import { Inject, Injectable, Logger } from '@nestjs/common';
import { Party } from '../../domain/entity/party.entity';
import { CreatePartyDto } from '../../domain/dto/createrParty.dto';
import MapperUtils from '../utils/mapper.utils';
import { PartyDto } from '../../domain/dto/party.dto';
import { EnterpriseRepositoryPort } from 'src/modules/enterprises/application/ports/enterprise.repository.port';
import { PartyRepositoryPort } from '../ports/party.repository.port';
import { UpdatePartyDto } from '../../domain/dto/updateParty.dto';

@Injectable()
export class PartyService {
  private readonly logger = new Logger(PartyService.name);

  constructor(
    @Inject('PartyRepositoryPort')
    private readonly partyRepository: PartyRepositoryPort,
    @Inject('EnterpriseRepositoryPort')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async createParty(createPartyDto: CreatePartyDto): Promise<PartyDto> {
    // Check if enterprise exist before update
    await this.enterpriseExists(createPartyDto.enterpriseId);

    const enterprise = await this.enterpriseRepository.findByEnterpriseId(
      createPartyDto.enterpriseId,
    );

    // Create a new Party and associate with the Enterprise
    const party = new Party(createPartyDto.name);
    party.enterprises = [enterprise!]; // Associate the party with the found enterprise

    const savedParty = await this.partyRepository.saveParty(party);
    return MapperUtils.partyEntityToDto(savedParty);
  }

  async updateParty(updatePartyDto: UpdatePartyDto): Promise<PartyDto> {
    await this.enterpriseExists(updatePartyDto.enterpriseId);

    const adjustedParty = new Party(updatePartyDto.name);
    adjustedParty.id = updatePartyDto.id;

    const updatedEntity = await this.partyRepository.updateParty(adjustedParty);

    return MapperUtils.partyEntityToDto(updatedEntity);
  }

  async findPartiesByEnterpriseId(enterpriseId: string): Promise<PartyDto[]> {
    await this.enterpriseExists(enterpriseId);
    const parties =
      await this.partyRepository.findAllPartiesByEnterpriseId(enterpriseId);
    return parties.map((p) => MapperUtils.partyEntityToDto(p));
  }

  private async enterpriseExists(enterpriseId: string) {
    const enterpriseExists =
      await this.enterpriseRepository.existsEnterpriseById(enterpriseId);

    if (!enterpriseExists) {
      this.logger.error(`Enterprise with ID ${enterpriseId} does not exist.`);
      throw new Error(`Enterprise with ID ${enterpriseId} does not exist.`);
    }
  }
}

