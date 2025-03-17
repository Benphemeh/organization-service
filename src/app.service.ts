import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'YAY!! Welcome to Organization service!';
  }
}
