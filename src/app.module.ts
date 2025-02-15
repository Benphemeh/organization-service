import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { EmployeeModule } from './module/employee/employee.module';
import { AdminModule } from './module/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './core/database/database.module';
import { OrganizationModule } from './module/create-organization/organization.module';
import { LoggerMiddleware } from './core/middleware/logger-middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    KafkaModule,
    EmployeeModule,
    AdminModule,
    OrganizationModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, LoggerMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
