import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  async onApplicationShutdown() {
    await this.producer.disconnect();
  }
  //onModule init
  async onModuleInit() {
    await this.producer.connect();
  }

  private readonly kafka = new Kafka({
    clientId: 'producer',
    brokers: ['localhost:9092'],
  });

  private readonly producer: Producer = this.kafka.producer();

  async Produce(record: ProducerRecord) {
    await this.producer.send(record);
  }
}
