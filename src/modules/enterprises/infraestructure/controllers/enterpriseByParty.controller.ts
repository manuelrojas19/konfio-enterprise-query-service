import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { EnterpriseService } from "../../application/services/enterprise.service";

@Controller('/parties')
export class EnterpriseByPartieController {

  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Get(':partyId/enterprises')
  async findById(@Param('partyId') id: string) {
    return this.enterpriseService.findAllByPartyId(id);
  }
}
