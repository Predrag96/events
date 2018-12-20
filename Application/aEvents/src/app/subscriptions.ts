export class Subscriptions {
    subscriptionIDs : Array<String> 
    userID: String
    
    constructor($id){
        this.subscriptionIDs = new Array<String>();
        this.userID = $id;
    }

    public pushIntoArray($id:String){
        this.subscriptionIDs.push($id);
    }

    public returnSubscriptions(){
        return this.subscriptionIDs
    }
}
