import { Module } from '@nestjs/common';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development.local'}`,
      isGlobal: true,
    }),
    DatabaseModule, // Importing encapsulated database configuration
    EnterpriseModule,
  ],
})
export class AppModule {}
