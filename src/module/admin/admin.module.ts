import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { modelInstances } from 'src/core/model-instances';
@Module({
  controllers: [AdminController],
  providers: [AdminService, ...modelInstances],
})
export class AdminModule {}
