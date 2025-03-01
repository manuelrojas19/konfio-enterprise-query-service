import { Inject, Injectable, Logger } from '@nestjs/common';
import { Party } from '../../domain/entity/party.entity';
import { PartyRepository } from '../../infraestructure/repository/party.repository';
import { CreatePartyDto } from '../../domain/dto/createrParty.dto';
import { EnterpriseRepository } from 'src/modules/enterprises/infraestructure/repository/enterprise.repository';
import MapperUtils from '../utils/mapper.utils';
import { PartyDto } from '../../domain/dto/party.dto';
import { EnterpriseRepositoryPort } from 'src/modules/enterprises/application/ports/enterprise.repository.port';
import { PartyRepositoryPort } from '../ports/party.repository.port';

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
    const enterpriseExists =
      await this.enterpriseRepository.existsEnterpriseById(
        createPartyDto.enterpriseId,
      );

    if (!enterpriseExists) {
      this.logger.error(
        `Enterprise with ID ${createPartyDto.enterpriseId} does not exist.`,
      );
      throw new Error(
        `Enterprise with ID ${createPartyDto.enterpriseId} does not exist.`,
      );
    }

    const enterprise = await this.enterpriseRepository.findByEnterpriseId(
      createPartyDto.enterpriseId,
    );

    // Create a new Party and associate with the Enterprise
    const party = new Party(createPartyDto.name);
    party.enterprises = [enterprise!]; // Associate the party with the found enterprise

    const savedParty = await this.partyRepository.saveParty(party);
    return MapperUtils.partyEntityToDto(savedParty);
  }

  async updateParty(party: Party): Promise<Party> {
    return this.partyRepository.updateParty(party);
  }

  async getPartiesByEnterpriseId(enterpriseId: string): Promise<Party[]> {
    return this.partyRepository.findAllPartiesByEnterpriseId(enterpriseId);
  }
}
