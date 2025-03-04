// src/enterprise/infrastructure/controllers/enterprise.controller.ts
import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { EnterpriseService } from '../../application/services/enterprise.service';
import { UpdateEnterpriseDto } from '../../domain/models/dto/updateEnterprise.dto';
import { CreateEnterpriseDto } from '../../domain/models/dto/createEnterprise.dto';

@Controller('/enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  async create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.createEnterprise(createEnterpriseDto);
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
