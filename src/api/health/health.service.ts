import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  sendOk(): string {
    return 'OK';
  }
}
