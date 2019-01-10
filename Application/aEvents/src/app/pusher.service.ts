import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
//rating service
export class PusherService {

  pusher:any;
  channel:any;
  returnedData:Subject<Object> = new Subject<Object>();

  private subject: Subject<Object> = new Subject<Object>();

  constructor(private http:HttpClient, data:DataService, eventID:string) { 
    this.pusher = new Pusher(environment.pusher.key,{
      cluster:environment.pusher.cluster,
      encrypted:true,
      //cluster:'eu',
      authEndpoint: data.$ServerIP+"/pusher/auth"
    });

    this.channel = this.pusher.subscribe('rating.'+eventID);
    
    this.channel.bind('eventRating', data=>{
      this.subject.next(data);
      
    })
    
  }

  getSubject() : Observable<Object>
  {
    return this.subject.asObservable();
  }

}
