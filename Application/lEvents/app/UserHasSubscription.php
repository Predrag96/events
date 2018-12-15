<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserHasSubscription extends Model
{
    protected $table = 'user_has_subscriptions';
    public $timestamps = false;
}
