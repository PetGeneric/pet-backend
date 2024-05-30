import { Injectable, Logger } from '@nestjs/common';
import { DiscordPayload } from './interfaces/discord-payload.interface';
import axios from 'axios';
@Injectable()
export class DiscordNotificationService {
  private readonly logger = new Logger(DiscordNotificationService.name);

  async sendNotification(payload: DiscordPayload): Promise<void> {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    const color = payload.type === 'error' ? 15158332 : 3447003;

    const messagePayload = {
      embeds: [
        {
          title: payload.title,
          description: payload.description,
          color: color,
          fields: [
            {
              name: 'Message',
              value: payload.message,
            },
          ],
        },
      ],
    };

    try {
      await axios.post(webhookUrl, messagePayload);
    } catch (error) {
      this.logger.error(
        'Error sending Discord notification',
        error.response?.data || error.message,
      );
    }
  }
}
