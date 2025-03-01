import {
  Body,
  Controller,
  Get,
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
    @Body() createPartyDto: CreatePartyDto,
  ) {
    createPartyDto.enterpriseId = enterpriseId;
    return this.partyService.createParty(createPartyDto);
  }

  @Get(':enterpriseId/parties')
  async findPartiesByEnterpriseId(
    @Param('enterpriseId') enterpriseId: string
  ) {
    return this.partyService.findPartiesByEnterpriseId(enterpriseId);
  }
}
