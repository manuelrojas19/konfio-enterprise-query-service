import { KafkaOptions, Transport } from '@nestjs/microservices';

// Properties
export default () => ({
    kafka: {
      host: process.env.KAFKA_BROKER_HOST,
      consumerGroup: process.env.KAFKA_CONSUMER_GROUP_ID,
    },
  });
  

export const kafkaConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      brokers: [process.env.KAFKA_BROKER_HOST || 'localhost:9092'],
    },
    consumer: {
      groupId: process.env.KAFKA_CONSUMER_GROUP_ID || 'enterprise-query-dev',
    },
  },
};
