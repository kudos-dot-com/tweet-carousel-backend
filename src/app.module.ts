import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TweetController } from './tweet/tweet.controller';
import { TweetsService } from './services/tweets/tweets.service';
import { HttpModule } from '@nestjs/axios';

@Module({ 
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AppController, TweetController],
  providers: [AppService, TweetsService],
})
export class AppModule {}
