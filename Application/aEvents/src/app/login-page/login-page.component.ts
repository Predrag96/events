import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {DataService} from '../data.service'
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-login-page', 
  template:'<app-profile-page [userInformation]="user"></app-profile-page>',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']

})

export class LoginPageComponent implements OnInit {

  user:User;
  message:string;
  
  constructor(private router:Router,private data:DataService) { }
  
  ngOnInit() {

  }

  // getUsers()
  // {
  //   return this.http.get('http://192.168.0.101:8000/api/allu');
  // }

  OnButtonClick(form:NgForm){
    this.data.login(form).subscribe(returnedData=>{
     
      if(returnedData == -1)
        alert("Netacne informacije");
      else
      {
        
        this.user = new User(returnedData["id"],returnedData["FirstName"],returnedData["LastName"],returnedData["Username"]);
        this.user.PicturePath = returnedData["PicturePath"];
        console.log(this.user);
        let navigationExtras: NavigationExtras = {
          queryParams: {
              "id": this.user.id,
              "FirstName": this.user.FirstName,
              "LastName": this.user.LastName,
              "Username": this.user.Username,
              "PicturePath":this.user.PicturePath
          }
      };
        this.router.navigate(["/profile-page"],navigationExtras);
        //console.log(this.user);
      }
       
    })
  }


  // OnButtonClick(form:NgForm){
  //   this.http.post('http://localhost/api/login',JSON.stringify(form.value),this.httpOptions);
  // }

}
