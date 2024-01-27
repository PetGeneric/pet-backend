import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './client/client.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ClientModule],
})
export class AppModule {}
