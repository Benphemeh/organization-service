import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { modelInstances } from 'src/core/model-instances';
@Module({
  // imports: [SequelizeModule.forFeature([Organization])],
  controllers: [AdminController],
  providers: [AdminService, ...modelInstances],
})
export class AdminModule {}
