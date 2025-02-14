import { Organization } from 'src/core/database';
import { REPOSITORY } from './constants';
import ActivityModel from './database/models/activity-log.model';

export const modelInstances = [
  {
    provide: REPOSITORY.ORGANIZATION,
    useValue: Organization,
  },
  {
    provide: REPOSITORY.ACTIVITY,
    useValue: ActivityModel,
  },
];
