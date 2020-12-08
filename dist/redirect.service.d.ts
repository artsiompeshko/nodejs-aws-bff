import { ConfigService } from '@nestjs/config';
export declare class RedirectService {
    private configService;
    constructor(configService: ConfigService);
    getServiceUrl(url: string): string;
}
