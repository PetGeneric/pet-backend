import { Injectable, Logger, ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
      }),
      catchError(error => {
        this.logger.error(`Error occurred: ${error.message}`, error.stack);
        return throwError(error);
      }),
    );
  }
}
