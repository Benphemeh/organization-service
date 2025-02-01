import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
@Module({
  // imports: [SequelizeModule.forFeature([Organization])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
