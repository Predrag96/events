import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {NgForm} from '@angular/forms';
import { Subscriptions } from './subscriptions';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  $ServerIP = "http://192.168.0.101:8000"

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

  register(form:NgForm){
    var $request = this.$ServerIP+"/api/register"
    return this.http.post($request,JSON.stringify(form.value),this.httpOptions);
  }

  getSubscriptions(){
    var $request = this.$ServerIP+"/api/allsubscr"
    return this.http.get($request);
  }

  addSubscriptions(subs:Subscriptions){
    var $request = this.$ServerIP+"/api/reg"
    return this.http.post($request,JSON.stringify(subs),this.httpOptions);
  }

}
