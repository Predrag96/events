<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Event;

class Picture extends Model
{
    protected $table = 'pictures';
    public $timestamps = false;

    public function events(){
        return $this->belongsToMany('App\Event', 'event_has_pictures', 'PictureID', 'EventID');
    }
}
