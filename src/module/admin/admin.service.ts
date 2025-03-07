import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/core/database';
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
  async findOneByEmail(email: string): Promise<Organization> {
    return await this.organizationRepository.findOne<Organization>({
      where: { email },
    });
  }

  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    // Make sure password is included and not null
    if (!createOrganizationDto.password) {
      throw new BadRequestException('Password is required');
    }

    // You might want to hash the password before saving
    const hashedPassword = await bcrypt.hash(createOrganizationDto.password, 6);

    // Create the organization with the hashed password
    return this.organizationRepository.create({
      ...createOrganizationDto,
      password: hashedPassword,
    });
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