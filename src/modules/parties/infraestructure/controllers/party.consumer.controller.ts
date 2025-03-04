import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePartyDto } from '../../domain/dto/createrParty.dto';

@Controller('kafka/parties')
export class PartyConsumerController {

  private readonly logger = new Logger(PartyConsumerController.name);

  @MessagePattern('enterprise-topic') // Escucha eventos del tópico 'enterprise-topic'
  async consumeAlert(@Payload() createPartyDto: CreatePartyDto) {
    this.logger.warn('🚨 Received Message:', createPartyDto);
  }
}
