import {
  Injectable,
  Req,
  Request,
  BadGatewayException,
  HttpException,
} from '@nestjs/common';

import axios, { Method } from 'axios';

import { RedirectService } from './redirect.service';

@Injectable()
export class AppService {
  constructor(private readonly redirectService: RedirectService) {}

  async processRequest(@Req() request: Request, body: any): Promise<any> {
    console.info('Processing request', request.url);

    const serviceUrl = this.redirectService.getServiceUrl(request.url);

    console.info('Parse service url', serviceUrl);

    if (!serviceUrl) {
      throw new BadGatewayException({
        message: 'Cannot process request',
      });
    }

    try {
      const { data } = await axios({
        method: request.method as Method,
        url: serviceUrl,
        ...(Object.keys(body).length > 0 ? { data: body } : {}),
      });

      return data;
    } catch (e) {
      throw new HttpException(e.response.data, e.response.status);
    }
  }
}
