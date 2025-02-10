import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from 'src/database';
import { REPOSITORY } from 'src/core/constants';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(REPOSITORY.ORGANIZATION)
    private readonly organizationRepository: typeof Organization,
  ) {}
  async create(user: CreateOrganizationDto): Promise<Organization> {
    return await this.organizationRepository.create<Organization>({ ...user });
  }

  //   update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
  //     const organization = this.findOne(id);
  //     if (organization) {
  //       Object.assign(organization, updateOrganizationDto);
  //       return organization;
  //     }
  //     return null;
  //   }
}
