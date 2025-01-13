import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Organization } from 'src/database';
@Module({
  imports: [SequelizeModule.forFeature([Organization])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
