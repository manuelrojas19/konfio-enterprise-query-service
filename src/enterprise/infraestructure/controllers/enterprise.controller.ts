// src/enterprise/infrastructure/controllers/enterprise.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { EnterpriseService } from '../../application/services/enterprise.service';

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
}
