import { Controller, Get } from '@nestjs/common';
import { OrgLoggerService } from './org-logger.service';

@Controller('logs')
export class OrgLoggerController {
  constructor(private logService: OrgLoggerService) {}

  @Get()
  async fetcAllLogs() {
    return await this.logService.fetchLogs();
  }

  @Get('activity')
  async fetchActivityLogs() {
    return await this.logService.fetchActivityLogs();
  }
}
