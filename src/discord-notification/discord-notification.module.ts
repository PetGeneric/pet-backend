import { Module } from '@nestjs/common';
import { DiscordNotificationService } from './discord-notification.service';

@Module({
  providers: [DiscordNotificationService],
})
export class DiscordNotificationModule {}
