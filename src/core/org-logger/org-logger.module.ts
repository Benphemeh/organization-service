import { Module } from '@nestjs/common';
import { modelInstances } from 'src/core/model-instances';
import { OrgLoggerController } from './org-logger.controller';
import { OrgLoggerService } from './org-logger.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [OrgLoggerController],
  providers: [OrgLoggerService, ...modelInstances],
  exports: [OrgLoggerService],
})
export class OrgLoggerModule {}
