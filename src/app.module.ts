import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { DiscordNotificationModule } from './discord-notification/discord-notification.module';
import { DiscordNotificationService } from './discord-notification/discord-notification.service';
import { AuthGuard } from './core/guards/auth.guard';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, 
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: ErrorInterceptor,
    },
    DiscordNotificationService
  ],
  imports: [
    ClientModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AdminModule,
    AuthModule,
    DiscordNotificationModule,
  ],
})
export class AppModule {}
