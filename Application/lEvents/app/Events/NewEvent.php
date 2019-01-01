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

class NewEvent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $event;

    public function __construct(Event $e)
    {
        $this->event=$e;
    }

    public function broadcastAs()
    {
        return 'eventEvent';
    }

    public function broadcastOn()
    {
       return new Channel('event');
       //$this->trigger('my-channel', 'my-event', array('message' => 'hello world'));
       //return ['kanal'];
    }
}