import { Organization } from 'src/database';
import { REPOSITORY } from './constants';

export const modelInstances = [
  {
    provide: REPOSITORY.ORGANIZATION,
    useValue: Organization,
  },
];
