import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrls: ['./create-event-page.component.scss']
})
export class CreateEventPageComponent implements OnInit {

  newEvent:Event
  subscriptions:Object;
  selectedOption:number;
  selectedPictures:File[];
  filesToUpload:FormData[];
  private readonly notifier:NotifierService;

  constructor(notifierService:NotifierService,private data:DataService, private route:ActivatedRoute) {
    this.notifier = notifierService;
    this.route.queryParams.subscribe(params=>{
      this.newEvent = new Event(null,null,null,params["id"],null,null);
    })
    this.selectedPictures = [];
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.data.getSubscriptions().subscribe(returnedData=>{
      this.subscriptions = returnedData;
    })
  }

  OnFileSelected(event)
  {
      this.selectedPictures = <Array<File>>event.target.files;
  }

  OnSelectedOptionChange(selectedOption){
     this.newEvent.SubID = selectedOption.toString();
     console.log(this.newEvent.SubID);
  }

  OnButtonClick(){
    const fd = new FormData();
     for(let i= 0; i<this.selectedPictures.length;i++){
      
       fd.append('image[]', this.selectedPictures[i],this.selectedPictures[i].name);
       //this.filesToUpload.push(fd);
     }
     console.log(fd.toString());
      this.data.addEvent(this.newEvent).subscribe(response=>{
        if(response == -1)
        {
          alert("Internal server error");
        }
        else
        {
          console.log("EventID: " + response.toString());
          
          for(let i=0;i<this.filesToUpload.length;i++)
               this.filesToUpload[i].append('EventID',response.toString())      
                  fd.append("EventID",response.toString());
          this.data.addPicturesToEvent(fd).subscribe(returned=>{
            
          });
          window.history.back();
        }
      })        
  }

}
