import { RedirectService } from './redirect.service';
export declare class AppService {
    private readonly redirectService;
    constructor(redirectService: RedirectService);
    processRequest(request: Request, body: any): Promise<any>;
}
