import {
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { Kafka, Producer, ProducerRecord, Admin } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
  private readonly kafka = new Kafka({
    clientId: 'producer',
    brokers: ['localhost:9092'], // Replace with your Kafka broker(s)
  });

  private readonly producer: Producer = this.kafka.producer();
  private readonly admin: Admin = this.kafka.admin();

  // Connect the producer when the module initializes
  async onModuleInit() {
    await this.producer.connect();
    await this.admin.connect();
  }

  // Disconnect the producer and admin when the application shuts down
  async onApplicationShutdown() {
    await this.producer.disconnect();
    await this.admin.disconnect();
  }

  // Produce a message to a Kafka topic
  async Produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  // List all Kafka topics
  async listTopics(): Promise<string[]> {
    const topics = await this.admin.listTopics();
    return topics;
  }

  // Fetch metadata for a specific Kafka topic
  async getTopicDetails(topic: string): Promise<any> {
    const metadata = await this.admin.fetchTopicMetadata({ topics: [topic] });
    return metadata;
  }

  // Delete a Kafka topic
  async deleteTopic(topic: string): Promise<void> {
    await this.admin.deleteTopics({
      topics: [topic],
    });
  }
}
