import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedirectService {
  constructor(private configService: ConfigService) {}

  getServiceUrl(url: string): string {
    const [_, service, ...rest] = url.split('/');

    if (!process.env[service]) {
      return '';
    }

    return `${process.env[service] + '/' + rest.join('/')}`;
  }
}
