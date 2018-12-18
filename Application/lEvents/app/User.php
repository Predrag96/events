<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Event;
use App\Comment;

class User extends Model
{
    protected $table = 'users';
    public $timestamps = false;

    public function createdEvents(){
        return $this->hasMany('App\Event', 'UserID', 'id');
    }

    public function commentedEvents(){
        return $this->belongsToMany( 'App\Event', 'comments', 'UserID', 'EventID')
        ->withPivot('comment');
    }

    public function subscriptions(){
        return $this->belongsToMany( 'App\Subscription', 'user_has_subscriptions', 'UID', 'SubID' );
    }
}
