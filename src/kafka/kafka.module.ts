import { Module } from '@nestjs/common';
import { ProducerService } from '../module/producer/producer.service';

@Module({
  providers: [ProducerService],
  exports: [ProducerService],
})
export class KafkaModule {}
