<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $users = User::with('subscriptions')->get();
       
        //return view('pages.users')->with("users",$users);
    }

    public function login(Request $request)
    {        
        $user = new User();
        $user->Username = $request->input('Username');
        $user->Password = $request->input('Password');

        $U=User::where('Username',$user->Username)
            ->where('Password', $user->Password)
            ->first();

        if (isset($U)) 
        {
            return $U;   
        }
        else return 0;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('pages.users');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $user = new User();
        $user->FirstName = $request->input('FirstName');
        $user->LastName = $request->input('LastName');
        $user->Email = $request->input('Email');
        $user->Password = $request->input('Password');
        $user->Username = $request->input('Username');
        $user->DOB = $request->input('DOB');
        $user->ProfilePic = '';
        $user->save();
        if(isset ($user->id))
            return $user;
        else return 0;
    }

    public function reg(Request $request)
    {
        $user=User::where('id', $request->input('userID'))->first();
        $sub=array();
        $sub= $request->input('subscriptionIDs');

        if(count($sub)>0)
        {
            foreach($sub as $n)
            {
                $user->subscriptions()->attach($n);
            }
            $user->save();            
        }
        return 1;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
