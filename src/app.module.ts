import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { EmployeeModule } from './employee/employee.module';
import { AdminModule } from './module/admin/admin.module';

@Module({
  imports: [KafkaModule, EmployeeModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
