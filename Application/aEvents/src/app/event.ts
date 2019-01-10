
export class Event {
   EventID:String;
   EventName:String;
   City:String;
   Location:String;
   Time:String;
   SubID:String;
   UserID:String;

   constructor(eid:String,name:String,time:String,uid:String,location:String,city:String){
       this.EventID = eid;
       this.EventName = name;
       this.City = city;
       this.Location = location;
       this.Time = time;
       this.UserID = uid;
   }
}
