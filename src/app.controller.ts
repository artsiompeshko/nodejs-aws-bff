import { Controller, All, Req, Request, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('/')
  async getHello(@Req() request: Request, @Body() body: any): Promise<any> {
    const result = await this.appService.processRequest(request, body);

    return result;
  }
}
