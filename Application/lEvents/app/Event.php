<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
use App\Comment;
use App\Subscription;
use App\Picture;

class Event extends Model
{
    protected $table = 'events';
    public $timestamps = false;

    public function user(){
        return $this->belongsTo('App\Users', 'UserID', 'id');
    }

    public function subscription(){
        return $this->belongsTo('App\Subscription', 'SubID', 'id');
    }

    public function users(){
        return $this->belongsToMany('App\User', 'comments', 'EventID', 'UserID' )
        ->withPivot('comment');
    }

    public function pictures(){
        return $this->belongsToMany('App\Picture', 'event_has_pictures', 'EventID', 'PictureID');
    }
}

