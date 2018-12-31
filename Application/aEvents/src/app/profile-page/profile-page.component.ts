import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { DataService } from '../data.service';

import { Ratings } from '../ratings';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})

export class ProfilePageComponent implements OnInit{
  
  user:User;
  events;
  selectedPicture:File = null;
  UserRatings= [];
  MoreDetailsVisible:Array<boolean>;

  public ratings:Ratings[] = [];
  
  constructor(private httpClient:HttpClient, private data:DataService, private route:ActivatedRoute, private router:Router) 
  {
      this.MoreDetailsVisible = new Array<boolean>();
      this.events =[];
      //ova ruta se aktivira nakon logina
      this.route.queryParams.subscribe(params=>{ 
        this.user = new User(params["id"],params["FirstName"],params["LastName"],params["Username"])
        this.user.PicturePath = this.data.$ServerIP+"/images/"+params["PicturePath"]
      });      
      
      
      this.data.getEvents().subscribe(returnedData=>{
         this.events = returnedData;
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
      this.data.addRating($rating).subscribe(response=>{
        //console.log(response);
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
    event.target.name = "Kur";
    // this.MoreDetailsVisible = !this.MoreDetailsVisible;

    // if(this.MoreDetailsVisible)
    //   this.EventDetailsBtnName = "Hide Event Details";
    // else
    //   this.EventDetailsBtnName = "Show Event Details"
  }

  IsVisible(i){
    return this.MoreDetailsVisible[i];
  }

}
