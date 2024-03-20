import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [KafkaModule, EmployeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
