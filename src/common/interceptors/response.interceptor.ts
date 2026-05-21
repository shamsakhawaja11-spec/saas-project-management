import {Injectable,NestInterceptor,ExecutionContext,CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class ResponseInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        const request=context.switchToHttp().getRequest<Request>();
        return next.handle().pipe(
            map((data)=>({
                statusCode:200,
                message:'success',
                data,
                timestamp:new Date().toISOString(),
                path:request.url,
            })),
        );
    }
}


