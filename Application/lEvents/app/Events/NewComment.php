<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewComment implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    //public $commentInfo;
    public $comment;
    public $username;
    public $eventId;

    public function __construct($c, $u, $id)
    {
        //$this->commentInfo=$a;
        $this->comment=$c;
        $this->username=$u;
        $this->eventId=$id;
    }

    public function broadcastAs()
    {
        return 'eventComment';
    }

    public function broadcastOn()
    {
       return new Channel('comment.'. $this->eventId);
       //$this->trigger('my-channel', 'my-event', array('message' => 'hello world'));
       //return ['kanal'];
    }
}
