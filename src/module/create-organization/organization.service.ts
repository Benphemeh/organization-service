import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/core/database';
import { REPOSITORY } from 'src/core/constants';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject(REPOSITORY.ORGANIZATION)
    private readonly organizationRepository: typeof Organization,
  ) {}
  // Create a new organization
  async create(user: CreateOrganizationDto): Promise<Organization> {
    return await this.organizationRepository.create<Organization>({ ...user });
  }
  // Find an organization by email
  async findOneByEmail(email: string): Promise<Organization> {
    const organization =
      await this.organizationRepository.findOne<Organization>({
        where: { email },
      });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  async validateUser(username: string, pass: string) {
    const user = await this.findOneByEmail(username);
    if (!user) {
      return null;
    }
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }
    const { ...result } = user['dataValues'];
    return result;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  async findAll() {
    return await this.organizationRepository.findAll();
  }

  // Find an organization by ID
  async findOne(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
    });
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  // Update an organization by ID
  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<Organization> {
    const organization = await this.findOne(id);
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    return await organization.update(updateOrganizationDto);
  }

  // Remove an organization by ID
  async remove(id: string): Promise<void> {
    const organization = await this.findOne(id);
    if (!organization) {
      throw new NotFoundException('Organization not found');
    }
    await organization.destroy();
  }
}
