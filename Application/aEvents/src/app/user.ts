export class User {
    id:string;
    FirstName:string;
    LastName:string;
    Email:string;
    DOB:string;
    Username:string;
    Pasword:string;
    PicturePath:string;
    SubscriptionIDs: Array<string>

    
    public constructor(id:string,fName:string,lName:string,username:string){
        this.SubscriptionIDs = new Array<string>();
        this.id = id;
        this.FirstName = fName;
        this.LastName = lName;
        this.Username = username;
    }

    public pushIntoArray(id:string){
        this.SubscriptionIDs.push(id);
    }

    public returnSubscriptions(){
        return this.SubscriptionIDs;
    }
}
