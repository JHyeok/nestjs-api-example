import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sendOk(): string {
    return 'OK';
  }
}
