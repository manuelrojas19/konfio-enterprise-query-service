import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Party } from './domain/entity/party.entity';
import { EnterpriseModule } from '../enterprises/enterprise.module';
import { PartyController } from './infraestructure/controllers/party.controller';
import { PartyService } from './application/services/party.service';
import { PartyRepository } from './infraestructure/repository/party.repository';
import { EnterpriseRepository } from '../enterprises/infraestructure/repository/enterprise.repository';
import { Enterprise } from '../enterprises/domain/models/entity/enterprise.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Party, Enterprise]), // Ensure PartyRepository is provided
    EnterpriseModule, // Import EnterpriseModule to use EnterpriseRepository
  ],
  controllers: [PartyController],
  providers: [
    PartyService,
    {
      provide: 'PartyRepositoryPort',
      useClass: PartyRepository, // Map interface to implementation
    }
  ],
})
export class PartiesModule {}
