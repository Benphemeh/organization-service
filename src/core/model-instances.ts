import { Organization } from 'src/core/database';
import { REPOSITORY } from './constants';

export const modelInstances = [
  {
    provide: REPOSITORY.ORGANIZATION,
    useValue: Organization,
  },
];
