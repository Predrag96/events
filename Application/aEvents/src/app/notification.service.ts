import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import * as Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  pusher:any;
  channel:any;
  returnedData:Subject<Object> = new Subject<Object>();

  private subject: Subject<Object> = new Subject<Object>();

  constructor(private http:HttpClient, eventID:string, private data:DataService) { 
    this.pusher = new Pusher(environment.pusher.key,{
      cluster:environment.pusher.cluster,
      encrypted:true,
      authEndpoint: data.$ServerIP+"/pusher/auth"
      //cluster:'eu',
      //authEndpoint: 'http://192.168.0.102:8000/pusher/auth'
    });

    this.channel = this.pusher.subscribe('ChannelName.'+eventID);
    
    this.channel.bind('eventName', data=>{
      this.subject.next(data);
      
    })
    
  }

  getSubject() : Observable<Object>
  {
    return this.subject.asObservable();
  }
}
