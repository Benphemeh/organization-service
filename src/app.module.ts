import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { EmployeeModule } from './module/employee/employee.module';
import { AdminModule } from './module/admin/admin.module';
import { ConfigModule } from '@nestjs/config';

import { OrganizationModule } from './module/create-organization/organization.module';
import { LoggerMiddleware } from './core/middleware/logger-middleware';
import { JwtService } from '@nestjs/jwt';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    KafkaModule,
    EmployeeModule,
    AdminModule,
    OrganizationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService, LoggerMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
