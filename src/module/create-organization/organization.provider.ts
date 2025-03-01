import { REPOSITORY } from 'src/core/constants';
import { Organization } from 'src/core/database';
import { OrganizationService } from './organization.service';

export const organizationProviders = [
  {
    provide: REPOSITORY.ORGANIZATION,
    useValue: Organization,
  },
  OrganizationService,
];
