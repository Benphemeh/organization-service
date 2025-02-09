import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Organization } from 'src/database';
import { CreateOrganizationDto } from '../create-organization/DTO/create-organization.dto';
import { UpdateOrganizationDto } from '../create-organization/DTO/update-organization.dto';
import { REPOSITORY } from 'src/core/constants';

@Injectable()
export class AdminService {
  constructor(
    @Inject(REPOSITORY.ORGANIZATION)
    private readonly organizationRepository: typeof Organization,
  ) {}

  async findAllOrganizations(): Promise<Organization[]> {
    return await this.organizationRepository.findAll();
  }

  async findOrganizationById(id: string): Promise<Organization> {
    const organization =
      await this.organizationRepository.findOne<Organization>({
        where: { id },
      });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationRepository.create<Organization>(
      createOrganizationDto as any,
    );
  }
  async updateOrganization(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.organizationRepository.findByPk(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return await organization.update(updateOrganizationDto);
  }

  async deleteOrganization(id: string): Promise<void> {
    const organization = await this.organizationRepository.findByPk(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    await organization.destroy();
  }
}
