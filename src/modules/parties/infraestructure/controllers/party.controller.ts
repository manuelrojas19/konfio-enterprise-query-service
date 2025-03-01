import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { PartyService } from '../../application/services/party.service';
import { CreatePartyDto } from '../../domain/dto/createrParty.dto';

@Controller('enterprises')
export class PartyController {
  private readonly logger = new Logger(PartyController.name);

  constructor(private readonly partyService: PartyService) {}

  @Post(':id/parties')
  async addParty(
    @Param('id') enterpriseId: string,
    @Body() partyData: CreatePartyDto,
  ) {
    partyData.enterpriseId = enterpriseId;
    return this.partyService.createParty(partyData);
  }
}
