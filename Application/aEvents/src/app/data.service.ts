import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {NgForm} from '@angular/forms';
import { Subscriptions } from './subscriptions';
import { User } from './user';
import { Event } from './event';


@Injectable({
  providedIn: 'root'
})
export class DataService {

   // $ServerIP = "http://192.168.0.102:8000"
    //$ServerIP = "http://10.66.25.6:8000"
    $ServerIP="http://127.0.0.1:8000"

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })};

  constructor(private http:HttpClient) { }
  
  getUsers(){
    var $request = this.$ServerIP + "/api/allu"
    return this.http.get($request)
  }

  login(form:NgForm){
    var $request = this.$ServerIP + "/api/login"
    return this.http.post($request,JSON.stringify(form.value),this.httpOptions);
  }

  register(user:User){
    var $request = this.$ServerIP+"/api/register"
    return this.http.post($request,JSON.stringify(user),this.httpOptions);
  }

  getSubscriptions(){
    var $request = this.$ServerIP+"/api/subscriptions"
    return this.http.get($request);
  }

  addSubscriptions(subs:Subscriptions){
    var $request = this.$ServerIP+"/api/reg"
    return this.http.post($request,JSON.stringify(subs),this.httpOptions);
  }

  getEvents(){
    var $request = this.$ServerIP+"/api/allEvents"
    return this.http.get($request);
  }

  addEvent(event:Event){
    var $request = this.$ServerIP+"/api/addevent"
    return this.http.post($request,JSON.stringify(event),this.httpOptions);
  }

  addPicture(id:string,picture:FormData){
    var $request = this.$ServerIP+"/api/addpicture";
    return this.http.post($request,picture);
  }

  addRating(rating){
    var $request = this.$ServerIP+"/api/addrating";
    return this.http.post($request,JSON.stringify(rating),this.httpOptions);
  }
}
