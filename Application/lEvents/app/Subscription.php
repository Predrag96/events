<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $table = 'subscriptions';
    public $timestamps = false;

    public function events(){
        return $this->hasMany('App\Event', 'SubID', 'id');
    }

    public function users(){
        return $this->belongsToMany( 'App\User', 'user_has_subscriptions', 'SubID', 'UID' );
    }
}
