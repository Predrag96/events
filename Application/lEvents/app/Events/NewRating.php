<?php

namespace App\Events;

use App\Event;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;


class NewRating implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $rating;
    public $eventId;

    public function __construct( $r, $id)
    {
        $this->rating=$r;
        $this->eventId=$id;
    }

    public function broadcastAs()
    {
        return 'eventRating';
    }

    public function broadcastOn()
    {
       return new Channel('rating.'. $this->eventId);
       //$this->trigger('my-channel', 'my-event', array('message' => 'hello world'));
       //return ['kanal'];
    }
}
