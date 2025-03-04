import { Inject, Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { Organization } from 'src/core/database';
import { REPOSITORY } from 'src/core/constants';
import { UpdateOrganizationDto } from './DTO/update-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(REPOSITORY.ORGANIZATION)
    private readonly organizationRepository: typeof Organization,
  ) {}
  async create(user: CreateOrganizationDto): Promise<Organization> {
    return await this.organizationRepository.create<Organization>({ ...user });
  }
  async findOneByEmail(email: string): Promise<Organization> {
    return await this.organizationRepository.findOne<Organization>({
      where: { email },
    });
  }

  async findAll() {
    return await this.organizationRepository.findAll();
  }

  findOne(id: string) {
    return this.organizationRepository.findOne({
      where: { id },
    });
  }

  update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    const organization = this.findOne(id);
    if (organization) {
      Object.assign(organization, updateOrganizationDto);
      return organization;
    }
  }
}
