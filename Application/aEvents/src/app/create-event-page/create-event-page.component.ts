import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss']
})
export class CreateEventPageComponent implements OnInit {

  newEvent:Event
  subscriptions:Object;
  selectedOption:number;

  constructor(private data:DataService, private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params=>{
      this.newEvent = new Event(null,null,params["id"],null,null);
    })
  
  }

  ngOnInit() {
    this.data.getSubscriptions().subscribe(returnedData=>{
      this.subscriptions = returnedData;
    })
  }

  OnSelectedOptionChange(selectedOption){
     this.newEvent.SubID = selectedOption.toString();
     console.log(this.newEvent.SubID);
  }

  OnButtonClick(){
     console.log(JSON.stringify(this.newEvent));
      this.data.addEvent(this.newEvent).subscribe(response=>{
       if(response == -1)
        {
          alert("Internal server error");
        }
        else{
            //vraca se na profilnu stranicu
            window.history.back();
        }
      })

    
  }

}
