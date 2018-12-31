export class Ratings {
    public userID:number;
    public EventID:number;
    public Rating:number;

    constructor(uID:number,eID:number,rat:number){
        this.userID = uID;
        this.EventID = eID;
        this.Rating = rat;
    }
}
