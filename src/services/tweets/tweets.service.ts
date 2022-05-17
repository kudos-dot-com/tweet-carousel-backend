import { Injectable } from '@nestjs/common';
import { HttpService  } from '@nestjs/axios';
import { Observable } from 'rxjs';
import {AxiosResponse} from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class TweetsService {
    constructor(private httpService: HttpService) {}

      async getTweets(id,author_id): Promise<any> {
        const encodeToken = "AAAAAAAAAAAAAAAAAAAAABx%2BbQEAAAAAK9DYKDHaTTiK4HDOnMnN8J40U%2F8%3DOzm1zk509dL3OgrKNdu2PsNHnAtRW1OQzs3Pxfs54zd6eWWfBY";

        const headersRequest = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${encodeToken}`,
        };

        const axiosResponse = await this.httpService.get('https://api.twitter.com/2/tweets/search/recent?tweet.fields=in_reply_to_user_id,author_id,created_at,conversation_id,public_metrics&query=conversation_id:'+id+'%20from:'+author_id+'&max_results=100&sort_order=relevancy',{ headers: headersRequest }).toPromise();
        return axiosResponse.data;
        
      }

      async callHttp(id): Promise<any> {
        let replies=[]
        const encodeToken = "AAAAAAAAAAAAAAAAAAAAABx%2BbQEAAAAAK9DYKDHaTTiK4HDOnMnN8J40U%2F8%3DOzm1zk509dL3OgrKNdu2PsNHnAtRW1OQzs3Pxfs54zd6eWWfBY";

        const headersRequest = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${encodeToken}`,
        };
        const axiosResponse = await this.httpService.get('https://api.twitter.com/2/tweets/'+id+'?expansions=attachments.media_keys%2Cauthor_id%2Cgeo.place_id%2Cattachments.poll_ids%2Cin_reply_to_user_id%2Centities.mentions.username%2Creferenced_tweets.id%2Creferenced_tweets.id.author_id&tweet.fields=author_id%2Cattachments%2Ccreated_at%2Cid%2Ccontext_annotations%2Cconversation_id%2Centities%2Cgeo%2Cin_reply_to_user_id%2Clang%2Cpublic_metrics%2Creferenced_tweets%2Creply_settings%2Csource%2Ctext%2Cwithheld&user.fields=name%2Centities%2Cdescription%2Cusername%2Cprofile_image_url&media.fields=public_metrics%2Cmedia_key%2Cheight%2Ctype%2Curl',{ headers: headersRequest }).toPromise();
        
        // delete axiosResponse.data.data["entities"];
        // return axiosResponse.data;
        
        const created = new Date(axiosResponse.data.data.created_at);
        const date = new Date(Date.now());
        const diff = date.getTime() - created.getTime();
        var daysDifference = Math.floor(diff/1000/60/60/24);
        console.log(daysDifference);
        if(daysDifference>=0 && daysDifference<=8){
          const conversation_id = axiosResponse.data.data.conversation_id;
          const author_id = axiosResponse.data.data.author_id;
          console.log(conversation_id);
          const response = await this.getTweets(conversation_id,author_id);
          console.log(response);
          for(let i in response.data){
            // console.log(response.data[i]['author_id']);
            // change is needed
            if(response.data[i]['author_id']==response.data[i]['in_reply_to_user_id']){
              // console.log(response.data[i]['text']);
              let data={}
              data['data']=response.data[i];
              replies.push(data)
            }
          }
          replies.reverse();
          console.log(replies);
          replies=[axiosResponse.data,...replies]
          return replies;

        }else{
          replies.push(axiosResponse.data)
        return replies;
      }
      }
}

