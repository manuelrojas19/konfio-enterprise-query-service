import { Module } from '@nestjs/common';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './enterprise/domain/models/entity/enterprise.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      entities: [Enterprise],
      database: 'enterprise-command-db',
      synchronize: true,
      logging: true,
    }),
    EnterpriseModule,
  ],
})
export class AppModule {}
