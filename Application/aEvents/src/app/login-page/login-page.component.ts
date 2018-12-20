import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {DataService} from '../data.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  users:Object;

  constructor(private data:DataService) { }
  

  ngOnInit() {
    
  }

  // getUsers()
  // {
  //   return this.http.get('http://192.168.0.101:8000/api/allu');
  // }

  OnButtonClick(form:NgForm){
    this.data.login(form).subscribe(data=>{
      this.users = data
      console.log(this.users)
    })
  }


  // OnButtonClick(form:NgForm){
  //   this.http.post('http://localhost/api/login',JSON.stringify(form.value),this.httpOptions);
  // }

}
