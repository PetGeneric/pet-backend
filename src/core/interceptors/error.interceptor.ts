import {
  Injectable,
  Logger,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { DiscordNotificationService } from 'src/discord-notification/discord-notification.service';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  constructor(
    private readonly discordNotificationService: DiscordNotificationService,
  ) {}
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Request ${method} ${url} completed`);
      }),
      catchError((error) => {
        const errorMessage = `Error occurred in ${method} ${url}`;
        this.discordNotificationService.sendNotification({
          title: 'Error Log',
          description: error.message,
          message: `${errorMessage}\n\n${error.stack}`,
          type: 'error',
        });
        this.logger.error(`Error occurred: ${error.message}`, error.stack);
        return throwError(error);
      }),
    );
  }
}
