import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  // Endpoint to fetch metadata for a specific Kafka topic
  @Get('topics/:topic')
  async getTopicDetails(@Param('topic') topic: string) {
    const details = await this.producerService.getTopicDetails(topic);
    return { status: 'success', details };
  }
  // Endpoint to delete a Kafka topic
  @Delete('topics/:topic')
  async deleteTopic(@Param('topic') topic: string) {
    await this.producerService.deleteTopic(topic);
    return {
      status: 'success',
      message: `Topic '${topic}' deleted successfully`,
    };
  }
}
