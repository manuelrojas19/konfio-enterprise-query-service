import { Injectable, OnModuleInit, Logger, Inject } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";


@Injectable()
export class KafkaService implements OnModuleInit {
  private readonly logger = new Logger(KafkaService.name);

  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    const kafkaEnabled = process.env.KAFKA_ENABLE === 'true';

    if (kafkaEnabled) {
      try {
        // Establish connection to Kafka
        await this.kafkaClient.connect();
        this.logger.log('Kafka started successfully');
      } catch (error) {
        this.logger.error('Failed to connect to Kafka', error.stack);
      }
    } else {
      this.logger.log('Kafka connection is disabled');
    }
  }
}
