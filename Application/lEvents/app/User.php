<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Event;
use App\Comment;
use App\Rating;

class User extends Model
{
    protected $table = 'users';
    public $timestamps = false;

    public function createdEvents(){
        return $this->hasMany('App\Event', 'UserID', 'id');
    }

    public function commentedEvents(){
        return $this->belongsToMany( 'App\Event', 'comments', 'UserID', 'EventID')
        ->withPivot('Comment');
    }

    public function ratedEvents(){
        return $this->belongsToMany( 'App\Event', 'ratings', 'UserID', 'EventID')
        ->withPivot('Rating');
    }

    public function subscriptions(){
        return $this->belongsToMany( 'App\Subscription', 'user_has_subscriptions', 'UID', 'SubID' );
    }
}
