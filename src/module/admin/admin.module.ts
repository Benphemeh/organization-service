import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminService } from './admin.service';
import { Organization } from 'src/database';
@Module({
  imports: [SequelizeModule.forFeature([Organization])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
