import { BadRequestException, Inject, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
// import { JwtService } from '@nestjs/jwt';
import { REPOSITORY } from 'src/core/constants';
import { USER_ROLE } from 'src/core/enums';
import { Organization } from 'src/core/database';
import { OrganizationService } from '../create-organization/organization.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @Inject(REPOSITORY.ORGANIZATION)
    private readonly organizationRepository: typeof Organization,
    private readonly organizationService: OrganizationService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const admin = await this.organizationRepository
      .findOne({ where: { email: process.env.SUPER_ADMIN_EMAIL as string } })
      .then((user) => {
        console.log('admin exist');
        return user;
      })

      .catch((error) => {
        console.log('admin not found', error);
      });
    if (!admin) {
      this.organizationRepository
        .create({
          firstName: process.env.SUPER_ADMIN_FIRST_NAME,
          lastName: process.env.SUPER_ADMIN_LAST_NAME,
          email: process.env.SUPER_ADMIN_EMAIL,
          password: await bcrypt.hash(
            process.env.SUPER_ADMIN_PASSWORD as string,
            10,
          ),
          role: USER_ROLE.SUPER_ADMIN,
          isDefaultPassword: false,
          gender: 'MALE',
        })
        .then(() => {
          console.log('admin created');
        })
        .catch((err) => console.log('could not create admin', err));
    }
  }

  async validateUser(username: string, pass: string) {
    const user = await this.organizationService.findOneByEmail(username);
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
  public async login(user) {
    const token = await this.generateToken(user);

    return {
      user,
      access_token: token,
    };
  }
  // async findOrganizationById(id: string): Promise<Organization> {
  //   console.log(`Finding organization with ID: ${id}`);

  //   if (!id) {
  //     throw new BadRequestException('Organization ID is required');
  //   }

  //   const organization =
  //     await this.organizationRepository.findOne<Organization>({
  //       where: { id },
  //     });

  //   if (!organization) {
  //     throw new NotFoundException(`Organization with ID ${id} not found`);
  //   }

  //   return organization;
  // }

  private async generateToken(user) {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    };

    return this.jwtService.sign(payload);
  }
  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
