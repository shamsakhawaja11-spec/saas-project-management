"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const AllExceptionsFilter_1 = require("./common/filters/AllExceptionsFilter");
const HttpExceptionFilter_1 = require("./common/filters/HttpExceptionFilter");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)), new response_interceptor_1.ResponseInterceptor());
    app.useGlobalFilters(new HttpExceptionFilter_1.HttpExceptionFilter(), new AllExceptionsFilter_1.AllExceptionsFilter());
    await app.listen(3000);
    console.log('http://localhost:3000');
}
bootstrap();
//# sourceMappingURL=main.js.map