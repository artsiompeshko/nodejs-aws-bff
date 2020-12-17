import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Method } from 'axios';

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

  shouldCache(url: string, method: string): boolean {
    if (url.endsWith('/products/') && method.toLowerCase() === 'get') {
      return true;
    }

    return false;
  }
}
