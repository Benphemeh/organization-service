import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Organization } from 'src/database';
import { CreateOrganizationDto } from '../create-organization/DTO/create-organization..dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Organization)
    private readonly organizationModel: typeof Organization,
  ) {}

  async findAllOrganizations(): Promise<Organization[]> {
    return await this.organizationModel.findAll();
  }

  async findOrganizationById(id: string): Promise<Organization> {
    const organization = await this.organizationModel.findByPk(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async createOrganization(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<Organization> {
    return await this.organizationModel.create(createOrganizationDto);
  }
  async deleteOrganization(id: string): Promise<void> {
    const organization = await this.organizationModel.findByPk(id);
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    await organization.destroy();
  }
}
