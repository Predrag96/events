<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Subscription;

class SubscriptionsController extends Controller
{
    public function index()
    {
        $subs = Subscription::with('users', 'events')->get();
        return view('pages.subscriptions')->with("subs",$subs);
    }

    public function allSubscriptions()
    {
        return Subscription::all();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'=>'required'
        ]);
        $sub = new Subscription();
        $sub->SubName= $request->input('name');
        $sub->save();

        return redirect ('/subscriptions');
    }

    public function addSub(Request $request)
    {
        $sub = new Subscription();
        $sub->SubName= $request->input('SubName');
        $sub->save();
    }
}
