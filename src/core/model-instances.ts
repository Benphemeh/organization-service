import { Organization } from 'src/core/database';
import { REPOSITORY } from './constants';
import ActivityModel from 'src/database/models/activity-log.model';
import Log from 'src/database/models/log.model';

export const modelInstances = [
  {
    provide: REPOSITORY.ORGANIZATION,
    useValue: Organization,
  },
  {
    provide: REPOSITORY.ACTIVITY,
    useValue: ActivityModel,
  },
  {
    provide: REPOSITORY.LOG,
    useValue: Log,
  },
];
