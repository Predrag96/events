import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//comment service
export class CommentService {

  pusher:any;
  channel:any;
  returnedData:Subject<Object> = new Subject<Object>();

  private subject: Subject<Object> = new Subject<Object>();

  constructor(private http:HttpClient, eventID:string) { 
    this.pusher = new Pusher(environment.pusher.key,{
      cluster:environment.pusher.cluster,
      encrypted:true,
      //cluster:'eu',
      authEndpoint: 'http://192.168.0.102:8000/pusher/auth'
    });

    this.channel = this.pusher.subscribe('comment.1');
    
    this.channel.bind('eventComment',data=>{
      this.subject.next(data);
      
    })
    
  }

  getSubject() : Observable<Object>
  {
    return this.subject.asObservable();
  }

}
