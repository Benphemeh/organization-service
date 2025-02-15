import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY } from 'src/core/constants';
import ActivityModel from 'src/core/database/models/activity-log.model';
import Log from '../database/models/log.model';

@Injectable()
export class OrgLoggerService {
  constructor(
    @Inject(REPOSITORY.LOG) private logRepo: typeof Log,
    @Inject(REPOSITORY.ACTIVITY) private activityRepo: typeof ActivityModel,
  ) {}

  async log(message: string, meta?: any) {
    await this.logRepo.create({ level: 'sucesss', message, meta });
  }
  async error(message: string, meta?: any) {
    await this.logRepo.create({ level: 'error', message, meta });
  }
  async fetchLogs() {
    return await this.logRepo.findAll({
      where: {
        level: 'error',
      },
      limit: 30,
      order: [['timestamp', 'DESC']],
    });
  }

  async fetchActivityLogs() {
    return await this.activityRepo.findAll({
      limit: 20,
      order: [['timestamp', 'DESC']],
    });
  }
}
