import { ExceptionFilter,Catch,ArgumentsHost,HttpStatus,Logger }from '@nestjs/common';
import { Response, Request } from 'express';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter{
    private readonly logger=new Logger(AllExceptionsFilter.name);
    catch(exception:unknown,host:ArgumentsHost){
        const ctx=host.switchToHttp();
        const response=ctx.getResponse<Response>();
        const request=ctx.getRequest<Request>();
        const status=HttpStatus.INTERNAL_SERVER_ERROR;
        const message='internal server error';
        this.logger.error(`Unhandled Exception: ${exception}`);

        const errorResponse={
            statusCode:status,
            message,
            timestamp:new Date().toISOString(),
            path:request.url,
        };
        response.status(status).json(errorResponse);
    }
}