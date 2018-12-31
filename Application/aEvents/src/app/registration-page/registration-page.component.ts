import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { DataService } from '../data.service';
import { User } from '../user';
import { Subscriptions } from '../subscriptions';
import { Router, NavigationExtras } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  response:Object;
  newUser:User;
  subscriptions:Object; //sluzi da prihavti podatke iz baze i da se na osnovu ovog objekta prikazu na formu;
  subs:Subscriptions; //sluzi da se naprave JSON objekti kako bi server mogao da radi sa tim podacima;

  constructor(private data:DataService, private router:Router) 
  { 
    this.subs = new Subscriptions();
    this.newUser = new User(null,null,null,null);
  }

  ngOnInit() 
  {
    this.data.getSubscriptions().subscribe(returnedData=>{
        this.subscriptions = returnedData;
    })
  }

  OnButtonClick()
  {   
    this.data.register(this.newUser).subscribe(data=>
      {
       this.response = data
       if(this.response > 0)
       {  
         this.newUser.id = this.response.toString();         
         let navigationExtras:NavigationExtras = {
          
          queryParams:{
            "id": this.newUser.id,
            "FirstName": this.newUser.FirstName,
            "LastName": this.newUser.LastName,
            "PicturePath":"default.png"
          }
        };  
         this.router.navigate(["/profile-page"],navigationExtras);
       }
       else if (this.response == -2)
       {
         alert("Username is already in use");
       }   
       else if (this.response == -3)
       {
         alert("Email is already in use");
       }
       else if  (this.response == -1)
       {
          alert("Internal server error");
       }
    });    
    
  }

  onDateValueChange(value:Date)
  {
    var $dateValue = value.getDate() + "/"+ (value.getMonth()+ 1) +"/"+value.getFullYear(); 
    this.newUser.DOB = $dateValue;
  }

  OnCheckBoxChange(option,event)
  {
      if(event.checked)
      {
        this.newUser.pushIntoArray(option);
      }
      else
      {
        for(var i=0; i< this.subs.returnSubscriptions().length; i++)
        {
          if(this.newUser.returnSubscriptions()[i] == option){
            this.newUser.returnSubscriptions().splice(i,1);
          }
        }
      }      
  }
}
