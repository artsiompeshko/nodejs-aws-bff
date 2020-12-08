import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedirectService {
  constructor(private configService: ConfigService) {}

  getServiceUrl(url: string): string {
    const [_, service, ...rest] = url.split('/');

    if (!this.configService.get(service)) {
      return '';
    }

    return `${this.configService.get(service) + '/' + rest.join('/')}`;
  }
}
