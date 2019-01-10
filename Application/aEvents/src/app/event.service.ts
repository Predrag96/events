import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import * as Pusher from 'pusher-js';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  pusher:any;
  channel:any;
  returnedData:Subject<Object> = new Subject<Object>();

  private subject: Subject<Object> = new Subject<Object>();

  constructor(private http:HttpClient, private data:DataService, SubIDs:Array<string>) { 
    this.pusher = new Pusher(environment.pusher.key,{
      cluster:environment.pusher.cluster,
      encrypted:true,
      authEndpoint: data.$ServerIP+"/pusher/auth"
      //cluster:'eu',
      //authEndpoint: 'http://192.168.0.102:8000/pusher/auth'
    });
    this.channel = [];
    for(let i = 0; i<SubIDs.length; i++)
    {
      this.channel[i] = this.pusher.subscribe('event.' + SubIDs[i]);
    }
    for(let i=0;i<this.channel.length;i++)
        this.channel[i].bind('eventEvent', data=>{
        this.subject.next(data);      
      })
  
    
  }

  getSubject() : Observable<Object>
  {
    return this.subject.asObservable();
  }
}
