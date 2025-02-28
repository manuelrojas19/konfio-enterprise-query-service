import { Module } from '@nestjs/common';
import { EnterpriseController } from './infraestructure/controllers/enterprise.controller';
import { EnterpriseService } from './application/services/enterprise.service';
import { EnterpriseRepository } from './infraestructure/repository/enterprise.repository';

@Module({
  imports: [],
  controllers: [EnterpriseController],
  providers: [
    EnterpriseService,
    {
      provide: 'EnterpriseRepositoryPort',
      useClass: EnterpriseRepository, // Map the interface to the implementation
    },
  ],
})
export class EnterpriseModule {}
