import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  changePasswordVisible:boolean = false;
  passwordsDontMatch:boolean = false;
  userID:any;
  constructor(private route:ActivatedRoute, private data:DataService){
       
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params=>{
      this.userID = params["id"];
      console.log(this.userID);
    })
  }

  OnChangePasswordClicked(){
    this.changePasswordVisible = true;
  }

  OnTextInputChange(newPass:string,passMatch:string){
    if(passMatch.length > 0){
      if(newPass != passMatch)
        this.passwordsDontMatch = true;
      else
        this.passwordsDontMatch = false;
    }
  }

  OnButtonClick(fm)
  {
    const myObj={
      "UserID":this.userID,
      "OldPassword":fm.value["OldPassword"],
      "NewPassword":fm.value["Password"]
    }
      this.data.changePassword(myObj).subscribe(response=>{
        if(response == -1)
          alert("User not found")
          else if (response == -2){
            alert("Wrong Old Password")
          }
          
      })
  }
}
