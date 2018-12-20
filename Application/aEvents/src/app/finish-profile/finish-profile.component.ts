import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { NgForm } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Subscriptions } from '../subscriptions';

@Component({
  selector: 'app-finish-profile',
  templateUrl: './finish-profile.component.html',
  styleUrls: ['./finish-profile.component.scss']
})
export class FinishProfileComponent implements OnInit {

  subscriptions : Object;
  subs:Subscriptions;
  constructor(private data:DataService){
  }

  ngOnInit() {
    this.subs = new Subscriptions("13");

    this.data.getSubscriptions().subscribe(data=>{
      this.subscriptions = data;
      console.log(this.subscriptions);
    })
    
  }

  OnCheckBoxChange(option,event){
    
    if(event.target.checked){
        var $var = option.id;
        this.subs.pushIntoArray($var.toString());
    }
    else
    {
      for(var i=0; i< this.subs.returnSubscriptions().length; i++)
      {
        if(this.subs.returnSubscriptions()[i] == option.id){
          this.subs.returnSubscriptions().splice(i,1);
        }
      }
    }
  }

  OnButtonClick(){
    this.data.addSubscriptions(this.subs).subscribe();
   // console.log(JSON.stringify(this.subs));
  }

}
