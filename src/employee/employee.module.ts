import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ProducerService } from 'src/kafka/producer/producer.service';

@Module({
  imports: [KafkaModule],
  providers: [EmployeeService, ProducerService],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
