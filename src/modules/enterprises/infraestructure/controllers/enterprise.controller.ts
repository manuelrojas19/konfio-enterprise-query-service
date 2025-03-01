// src/enterprise/infrastructure/controllers/enterprise.controller.ts
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { EnterpriseService } from '../../application/services/enterprise.service';
import { CreatePartyDto } from 'src/modules/parties/domain/dto/createrParty.dto';
import { PartyService } from 'src/modules/parties/application/services/party.service';
import { UpdateEnterpriseDto } from '../../domain/models/dto/updateEnterprise.dto';

@Controller('/enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  async create(
    @Body() createEnterpriseDto: { name: string; type: string; taxId: string },
  ) {
    return this.enterpriseService.createEnterprise(
      createEnterpriseDto.name,
      createEnterpriseDto.type,
      createEnterpriseDto.taxId,
    );
  }

  @Get()
  async findAll() {
    return this.enterpriseService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.enterpriseService.findById(id);
  }

  @Put(':id')
  async updateEnterprise(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    updateEnterpriseDto.id = id;
    return this.enterpriseService.updateEnterprise(updateEnterpriseDto);
  }
}
