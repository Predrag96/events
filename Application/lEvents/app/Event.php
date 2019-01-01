<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Comment;
use App\Subscription;
use App\Rating;
use App\Picture;

class Event extends Model
{
    protected $table = 'events';
    public $timestamps = false;
    protected $fillable = ['EventName', 'SubID', 'UserID', 'Location', 'Time', 'City'];

    
    public function creator(){
        return $this->belongsTo('App\User', 'UserID', 'id');
    }

    public function category(){
        return $this->belongsTo('App\Subscription', 'SubID', 'id');
    }

    public function userComments(){
        return $this->belongsToMany('App\User', 'comments', 'EventID', 'UserID' )
        ->withPivot('Comment');
    }

    public function userRatings(){
        return $this->belongsToMany('App\User', 'ratings', 'EventID', 'UserID' )
        ->withPivot('Rating');
    }

    public function pictures(){
        return $this->belongsToMany('App\Picture', 'event_has_pictures', 'EventID', 'PictureID');
    }
}

