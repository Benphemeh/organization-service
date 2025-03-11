import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/core/database';
import { REPOSITORY } from 'src/core/constants';
import { UpdateOrganizationDto } from './DTO/update-organization.dto';
import { CreateOrganizationDto } from './DTO/create-organization.dto';

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
  async remove(id: string): Promise<void> {
    const organization = await this.findOne(id);
    await organization.destroy();
  }
}
