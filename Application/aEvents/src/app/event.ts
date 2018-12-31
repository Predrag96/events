
export class Event {
   EventName:String;
   City:String;
   Location:String;
   Time:String;
   SubID:String;
   UserID:String;

   constructor(name:String,time:String,uid:String,location:String,city:String){
       this.EventName = name;
       this.City = city;
       this.Location = location;
       this.Time = time;
       this.UserID = uid;
   }
}
