import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminService } from 'src/module/admin/admin.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userExist = await this.adminService.findOneByEmail(
      request.body.email,
    );
    if (userExist) {
      throw new ForbiddenException('This email already exist with an account');
    }
    return true;
  }
}
