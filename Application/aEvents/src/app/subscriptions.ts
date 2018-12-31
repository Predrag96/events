import { User } from "./user";

export class Subscriptions {
    subscriptionIDs : Array<String> 
    user: User;
    
    constructor(){
        this.subscriptionIDs = new Array<String>();
        
    }

    public addSubscriptionIDs($SubID:String){
        this.subscriptionIDs.push($SubID);
    }

    public returnSubscriptions(){
        return this.subscriptionIDs
    }
}
