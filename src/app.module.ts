import { Module, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedirectService } from './redirect.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register(),
  ],
  controllers: [AppController],
  providers: [AppService, RedirectService],
})
export class AppModule {}
