import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ProducerRecord } from 'kafkajs';

@Controller('producer')
export class ProducerController {
  constructor(private readonly producerService: ProducerService) {}

  @Post()
  async sendMessage(@Body() record: ProducerRecord) {
    await this.producerService.Produce(record);
    return { status: 'success', message: 'Message successfully sent' };
  }
  @Get('topics')
  async listTopics() {
    const topics = await this.producerService.listTopics();
    return { status: 'success', topics };
  }
}
