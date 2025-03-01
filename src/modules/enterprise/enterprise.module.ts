import { Module } from '@nestjs/common';
import { EnterpriseController } from './infraestructure/controllers/enterprise.controller';
import { EnterpriseService } from './application/services/enterprise.service';
import { EnterpriseRepository } from './infraestructure/repository/enterprise.repository';
import { Enterprise } from './domain/models/entity/enterprise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise])],
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
