import { Module } from '@nestjs/common';
import { EnterpriseModule } from './modules/enterprises/enterprise.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';
import { PartiesModule } from './modules/parties/parties.module';
import { Kafka } from 'kafkajs';
import { KafkaModule } from './config/kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development.local'}`,
      isGlobal: true,
    }),
    DatabaseModule, // Importing encapsulated database configuration
    KafkaModule,
    EnterpriseModule,
    PartiesModule,
  ],
})
export class AppModule {}
