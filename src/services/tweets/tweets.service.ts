import { Injectable } from '@nestjs/common';
import { HttpService  } from '@nestjs/axios';
import { Observable } from 'rxjs';
import {AxiosResponse} from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class TweetsService {
    constructor(private httpService: HttpService) {}

      callHttp(id): Observable<Array<Object>> {
        const encodeToken = "AAAAAAAAAAAAAAAAAAAAABx%2BbQEAAAAAK9DYKDHaTTiK4HDOnMnN8J40U%2F8%3DOzm1zk509dL3OgrKNdu2PsNHnAtRW1OQzs3Pxfs54zd6eWWfBY";

        const headersRequest = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${encodeToken}`,
        };
        return this.httpService.get('https://api.twitter.com/2/tweets/'+id+'?expansions=attachments.media_keys%2Cauthor_id%2Cgeo.place_id%2Cattachments.poll_ids%2Cin_reply_to_user_id%2Centities.mentions.username%2Creferenced_tweets.id%2Creferenced_tweets.id.author_id&tweet.fields=author_id%2Cattachments%2Ccreated_at%2Cid%2Ccontext_annotations%2Cconversation_id%2Centities%2Cgeo%2Cin_reply_to_user_id%2Clang%2Cpublic_metrics%2Creferenced_tweets%2Creply_settings%2Csource%2Ctext%2Cwithheld&user.fields=name%2Centities%2Cdescription%2Cusername%2Cprofile_image_url&media.fields=public_metrics%2Cmedia_key%2Cheight%2Ctype%2Curl',{ headers: headersRequest }).pipe(
          map((axiosResponse: AxiosResponse) => {
            return axiosResponse.data;
          })
        );
      }
}
