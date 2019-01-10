import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DataService } from '../data.service';

import { Ratings } from '../ratings';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../event.service';

import {Comment} from '../comment';
import { CommentService } from '../comment.service';
import { PusherService } from '../pusher.service';
import { NotifierService } from 'angular-notifier';
import { Event } from '../event';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})

export class ProfilePageComponent implements OnInit{
  
  user:User;
  events;
  comments;
  selectedPicture:File = null;
  UserRatings= [];
  MoreDetailsVisible:Array<boolean>;
  eventService:EventService;
  commentService:CommentService;
  ratingService:PusherService; //rating
  private readonly notifier:NotifierService;
  public ratings:Ratings[] = [];
  
  constructor(notiferService:NotifierService,private httpClient:HttpClient, private data:DataService, private route:ActivatedRoute, private router:Router) 
  {
       //ova ruta se aktivira nakon logina
       this.route.queryParams.subscribe(params=>{ 
        this.user = new User(params["id"],params["FirstName"],params["LastName"],params["Username"])
        this.user.SubscriptionIDs = params["SubscriptionIDs"];
        this.user.PicturePath = this.data.$ServerIP+"/images/"+params["PicturePath"]
      });      

      this.notifier =notiferService;
      this.eventService = new EventService(httpClient,data, this.user.SubscriptionIDs);
      this.MoreDetailsVisible = new Array<boolean>();
      this.events = [];
      this.comments = [];
         
      const myObj = {
        SubIDs : this.user.SubscriptionIDs
      }

      this.data.getFileteredEvents(myObj).subscribe(returnedData=>{
          this.events = returnedData;
          console.log(this.events);
          for(let i =0; i< this.events.length; i++)
              for(let j=0; j< this.events[i]["PicturePath"].length; j++)
              {
                this.events[i]["PicturePath"][j] = this.data.$ServerIP+"/images/"+this.events[i]["PicturePath"][j];
                console.log("SLICKE");
                console.log(this.events[i]["PicturePath"][j]);
              }

      })
      
      this.eventService.getSubject().subscribe(retdata=>{
          this.events.push(retdata);
          this.notifier.notify('success',"Event je napravljen");
       })
   }

  ngOnInit() {
    
  }

  //postavlja profilnu sliku
  OnFileSelected(event)
  {
    this.selectedPicture = <File>event.target.files[0];

    console.log(this.selectedPicture);
    const fd = new FormData();
    fd.append('image',this.selectedPicture,this.selectedPicture.name);
    fd.append('id',this.user.id.toString());
    console.log(fd);
    this.data.addPicture(this.user.id.toString(),fd).subscribe(response=>{
      console.log(response) // response da bude picture path i onda da se direktno promeni kao u konstruktoru
    });
  }  

  starHandler(num,eventID){   
    var $rating = new Ratings(Number.parseInt(this.user.id),eventID,num);
    let $ratingFound:boolean = false;
    for(var i = 0;i<this.UserRatings.length;i++)
    {
      if(this.UserRatings[i].EventID == $rating.EventID)
      {
          this.UserRatings[i].Rating = $rating.Rating;
          $ratingFound = true;
      }
    }

    if($ratingFound == false)
      this.UserRatings.push($rating);

      console.log(JSON.stringify($rating));
      this.data.addRating($rating).subscribe();
      
      this.ratingService = new PusherService(this.httpClient, this.data,eventID);
      this.ratingService.getSubject().subscribe(rating=>{
       
        for(let i = 0; i < this.events.length; i++)
        {              
              if(this.events[i].id == eventID)  
                  this.events[i].Rating = rating["rating"];       
        }         
      });
  }

  OnCreateNewEventClick(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": this.user.id
      }
    };
      this.router.navigate(["/create-event-page"],navigationExtras);
  }

  ToggleEventDetails(event){
    this.MoreDetailsVisible[event.target.id] = !this.MoreDetailsVisible[event.target.id];
    for(let i = 0; i<this.MoreDetailsVisible.length; i++)
    {
      if (i != event.target.id)
        this.MoreDetailsVisible[i] = false;
    }
    if(this.MoreDetailsVisible[event.target.id] == true)
        this.data.getComment(this.events[event.target.id]).subscribe(returnedData=>{
              this.comments = returnedData;
              console.log("COMMENTS")
              console.log(this.comments);
        })
    
  }

  IsVisible(i){
      return this.MoreDetailsVisible[i];
  }

  OnCommentButtonClick(commentValue, event){
    console.log(event.id);
    var comment1= new Comment(this.user.id,commentValue,event.id) ;
    this.data.addComment(comment1).subscribe();
    this.commentService = new CommentService(this.httpClient,this.data,event.id);
    this.commentService.getSubject().subscribe(comm=>{
      console.log(comm);
      this.comments.push(comm);
      if(comm["username"] != this.user.Username)
      {
          var message:string = comm["username"] + " je komentarisao dogadjaj";
          this.notifier.notify('warning',message)
      }
    })
  }

  OnSettingsClick(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": this.user.id,
          
      }
  };
    this.router.navigate(['settings-page'], navigationExtras)
  }
}
