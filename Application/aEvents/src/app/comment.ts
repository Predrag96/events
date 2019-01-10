export class Comment {
    UserID:String;
    EventID:String;
    comment:String;

    constructor(uid:String,comment:String,eid:String){
        this.UserID = uid;
        this.comment = comment;
        this.EventID = eid;
    }
}
