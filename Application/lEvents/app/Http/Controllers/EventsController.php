<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event;
use App\Picture;
use App\User;
use App\Rating;
use App\Subscription;
use App\Comment;
use App\Events\NewRating;
use App\Events\NewEvent;
use App\Events\NewComment;

class EventsController extends Controller
{
    public function index()
    {
        $events = Event::with('userRatings', 'userComments', 'pictures')->get();
        return view('pages.events')->with("events",$events);
    }
    
    public function filteredEvents(Request $request)
    {
        $subIDs=$request->input('SubIDs');
        $events=Event::whereIn('SubID', $subIDs)->get();
        if (isset($events))
        return $events;
        else return -1;
    }

    public function alle()
    {
        return Event::with('userRatings', 'userComments', 'pictures', 'creator', 'category')->get();
    }

    public function addrating(Request $request)
    //EventId, UserID, rating
    {
        $event = Event::where('id', $request->input('EventID'))->with('userRatings')->first();
        $user=User::where('id', $request->input('userID'))->first();

        if(isset($event))
        {
        $e=$event->userRatings()
        ->wherePivot('UserID', $request->input('userID'))->first();
        if(isset($e))
        {
            $event->userRatings()
            ->wherePivot('UserID', $request->input('userID'))
            ->updateExistingPivot($request->input('userID'), ['Rating' => $request->input('Rating')], false);
            $event->save;
        }
        else
        {
            $event->userRatings()->attach($request->input('userID'), ['Rating' => $request->input('Rating')]);
            $event->save;
        }       

        $rating=0;
        $num=0;
        $event = Event::where('id', $request->input('EventID'))->with('userRatings')->first();

        foreach($event->userRatings as $e)
        {
            $rating+=$e->pivot->Rating;
            $num=$num+1;
        }

        $rating= $rating/$num;

        //$a= array("Rating"=>$rating, "Username" =>$user->Username);
        //event(new NewRating($a, $event->id));
        return $rating;
        }
        else return -1;
    }

    public function addcomment(Request $request)
    //EventId, UserID, comment
    {
        $event=Event::where('id', $request->input('EventID'))->first();
        $user=User::where('id', $request->input('userID'))->first();

        if(isset($event))
        {
        $event->userComments()->attach($request->input('userID'), ['comment' => $request->input('Comment')]);
        $event->save();

        $a= array("Comment"=>$request->input('Comment'), "Username" =>$user->Username);
        event(new NewComment($a, $event->id));
        }
        else return -1;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'=>'required',
            'location'=>'required',
            'time'=>'required',
            'city'=>'required',
        ]);
        $event = new Event();
        $event->EventName = $request->input('name');
        $event->Location = $request->input('location');
        $event->City = $request->input('city');
        $event->Time = $request->input('time');
        $event->UserID =User::find(1)->id;
        $event->SubID = Subscription::find(1)->id;
        
        $event->save();
        //$event->userComments()->attach(1 , ['comment' => 'ovo je neki komentar na neki event']);
        //$event->pictures()->attach(1);
        //$event->userRatings()->attach(2, ['rating' => 4]);

        return redirect ('/events');
    }

    public function addEvent(Request $request)
    {
        $event = new Event();
        $event->EventName = $request->input('EventName');
        $event->Location = $request->input('Location');
        $event->City = $request->input('City');
        $event->Time = $request->input('Time');   
        $event->UserID =$request->input('UserID');
        $event->SubID = $request->input('SubID');
        $event->save();

        $i=array();
        $i=$request->input('image');
        if ($request->file('image')!=null)
        {
        foreach($request->file('image') as $image)
        {
            $pic= new Picture();
            $pic->PicturePath=' ';
            $pic->save();

            $imagename= time() . $pic->id. '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/images');
            $image->move($destinationPath, $imagename);
            $pic->PicturePath=$imagename;
            $pic->save();

            $event->pictures()->attach($pic);
        }
        $event->save();

        event(new NewEvent($event));
        if(isset($event))
            return 1;
        else return -1;
        }
        else return -2;
    }
}
