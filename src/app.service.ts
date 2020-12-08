import {
  Injectable,
  Req,
  Request,
  BadGatewayException,
  HttpException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';

import { Cache } from 'cache-manager';

import axios, { Method } from 'axios';

import { RedirectService } from './redirect.service';

@Injectable()
export class AppService {
  constructor(
    private readonly redirectService: RedirectService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async processRequest(@Req() request: Request, body: any): Promise<any> {
    console.info('Processing request', request.url);

    const serviceUrl = this.redirectService.getServiceUrl(request.url);

    console.info('Parse service url', serviceUrl);

    if (!serviceUrl) {
      throw new BadGatewayException({
        message: 'Cannot process request',
      });
    }

    const cachedResult = await this.cacheManager.get(
      serviceUrl + request.method,
    );

    if (cachedResult) {
      console.info('Returning result from cache');

      return cachedResult;
    }

    try {
      const { data } = await axios({
        method: request.method as Method,
        url: serviceUrl,
        ...(Object.keys(body).length > 0 ? { data: body } : {}),
      });

      if (this.redirectService.shouldCache(serviceUrl, request.method)) {
        console.info('Caching result for', serviceUrl, request.method);

        await this.cacheManager.set(serviceUrl + request.method, data, {
          ttl: 120,
        });
      }

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, e.response.status);
    }
  }
}
