import { PartyDto } from '../../domain/dto/party.dto';
import { Party } from '../../domain/entity/party.entity';

export default class MapperUtils {
  // Mapper function to convert from Entity to DTO
  static partyEntityToDto(party: Party): PartyDto {
    return new PartyDto(party.id, party.name, party.createdAt, party.updatedAt);
  }

  static partyDtoToEntity(partyDto: PartyDto): Party {
    const party = new Party(partyDto.name); 
    party.createdAt = partyDto.createdAt;
    party.updatedAt = partyDto.updatedAt;
    return party;
  }
}
