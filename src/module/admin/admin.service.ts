import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/core/database';
import { CreateOrganizationDto } from '../create-organization/dto/create-organization.dto';
import { UpdateOrganizationDto } from '../create-organization/dto/update-organization.dto';
import { REPOSITORY } from 'src/core/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @Inject(REPOSITORY.ORGANIZATION)
    private readonly organizationRepository: typeof Organization,
    private readonly jwtService: JwtService,
  ) {}

  // Create a new organization
  async createOrganization(createOrganizationDto: CreateOrganizationDto) {
    if (!createOrganizationDto.password) {
      throw new BadRequestException('Password is required');
    }

    const hashedPassword = await bcrypt.hash(createOrganizationDto.password, 6);

    const organization = await this.organizationRepository.create({
      ...createOrganizationDto,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = this.generateToken(organization);

    const { ...orgData } = organization.dataValues;

    return {
      organization: orgData,
      access_token: token,
    };
  }

  // Find all organizations
  async findAllOrganizations(): Promise<Organization[]> {
    return await this.organizationRepository.findAll();
  }

  // Find an organization by ID
  async findOrganizationById(id: string): Promise<Organization> {
    if (!id) {
      throw new BadRequestException('Organization ID is required');
    }

    const organization =
      await this.organizationRepository.findOne<Organization>({
        where: { id },
      });

    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }

    return organization;
  }
  // Find an organization by email
  async findOneByEmail(email: string): Promise<Organization> {
    return await this.organizationRepository.findOne<Organization>({
      where: { email },
    });
  }

  private generateToken(organization) {
    const payload = {
      email: organization.email,
      sub: organization.id,
      role: organization.role || 'organization',
    };

    return this.jwtService.sign(payload);
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
