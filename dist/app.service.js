"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const redirect_service_1 = require("./redirect.service");
let AppService = class AppService {
    constructor(redirectService) {
        this.redirectService = redirectService;
    }
    async processRequest(request, body) {
        console.info('Processing request', request.url);
        const serviceUrl = this.redirectService.getServiceUrl(request.url);
        console.info('Parse service url', serviceUrl);
        if (!serviceUrl) {
            throw new common_1.BadGatewayException({
                message: 'Cannot process request',
            });
        }
        try {
            const { data } = await axios_1.default(Object.assign({ method: request.method, url: serviceUrl }, (Object.keys(body).length > 0 ? { data: body } : {})));
            return data;
        }
        catch (e) {
            throw new common_1.HttpException(e.response.data, e.response.status);
        }
    }
};
__decorate([
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "processRequest", null);
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [redirect_service_1.RedirectService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map