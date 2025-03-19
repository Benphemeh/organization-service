import { Body, Controller, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerRecord } from 'kafkajs';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post('send')
  async sendMessage(@Body() record: ProducerRecord) {
    try {
      await this.producerService.Produce(record);
      return { status: 'success', message: 'Message successfully sent' };
    } catch (error) {
      return { status: 'error', message: 'Failed to send message', error };
    }
  }
}
