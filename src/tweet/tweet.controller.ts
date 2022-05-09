import { Controller, Post, Body, Get, Patch, Param, Delete  } from '@nestjs/common';
import { TweetsService } from 'src/services/tweets/tweets.service';

@Controller('tweet')
export class TweetController {
    constructor(private tweetsService: TweetsService) {}
    @Get('/:id')
    findAll(@Param('id') id){
        return this.tweetsService.callHttp(id);
    }
}
