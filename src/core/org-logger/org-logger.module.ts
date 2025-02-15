import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { modelInstances } from 'src/core/model-instances';
import { OrgLoggerController } from './org-logger.controller';
import { OrgLoggerService } from './org-logger.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrgLoggerController],
  providers: [OrgLoggerService, ...modelInstances],
  exports: [OrgLoggerService],
})
export class OrgLoggerModule {}
