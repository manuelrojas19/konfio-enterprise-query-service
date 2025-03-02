import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kafka/parties')
export class PartyConsumerController {
  private readonly logger = new Logger(PartyConsumerController.name);

  @MessagePattern('enterprise-topic') // Escucha eventos del tópico 'enterprise-topic'
  async consumeAlert(@Payload() message: any) {
    this.logger.warn('🚨 Received Message:', message.value);
  }
}
