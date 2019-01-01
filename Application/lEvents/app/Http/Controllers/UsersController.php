<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all();
       
        return view('pages.users')->with("users",$users);
    }

    public function deleteUser(Request $request)
    {
        $user=User::where('id', $request->input('userID'))->first();

        if($user->ProfilePic!='default.png')
                {
                $image_path = public_path().'/images/'.$U->ProfilePic; 
                unlink($image_path);
                }
        $user->delete();
        return 1;
    }

    public function getbyname(Request $request)
    {
        $users= User::where('FirstName', $request->input('FirstName'))->
        where('LastName', $request->input('LastName'))->get();
        if(isset($users))
        {return $users;}
        else {return -1;}
    }

    public function userdetails()
    {
        return User::with('commentedEvents', 'ratedEvents', 'subscriptions', 'createdEvents')->get();
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'firstname'=>'required',
            'lastname'=>'required',
            'email'=>'required',
            'password'=>'required',
            'username'=>'required',
            'dob'=>'required',
            'profilepic'=>'required'
        ]);
        $user = new User();
        $user->FirstName = $request->input('firstname');
        $user->LastName = $request->input('lastname');
        $user->Email = $request->input('email');
        $user->Password = $request->input('password');
        $user->Username = $request->input('username');
        $user->DOB = $request->input('dob');
        $user->ProfilePic = $request->input('profilepic');
        $user->save();
        $user->subscriptions()->attach(1);

        return redirect ('/users');
    }

    public function changeSubs(Request $request)
    {
        $user=User::where('id', $request->input('userID'))->first();
        $sub=array();
        $sub= $request->input('subscriptionIDs');
        $pom= array();
        
        $pom= $user->subscriptions();
        foreach($pom as $s)
        {
            $user->subscriptions()->detach($s);
        }

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
            $mess= array("id"=>$U->id, "FirstName"=>$U->FirstName, "LastName"=>$U->LastName, 
            "Username"=>$U->Username, "PicturePath"=>$U->ProfilePic);
            return $mess;
        }
        else return -1;
    }

    public function changePassword(Request $request)
    {
        $U=User::where('id',$request->input('id'))->first();
        if(isset($U))
        {
            $U->Password=$request->input("Password");
            $U->save();
            return 1;
        }
        else return -1;
    }

    public function changePicture(Request $request)
    {
        $U=User::where('id',$request->input('id'))->first();
        if(isset($U))
        {
            $image= $request->file('image');
            if(isset($image))
            {
                if($U->ProfilePic!='default.png')
                {
                $image_path = public_path().'/images/'.$U->ProfilePic; 
                unlink($image_path);
                }

            $imagename= time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/images');
            $image->move($destinationPath, $imagename);
            $U->ProfilePic=$imagename;
            $U->save();
            return 1;
            }
            else return -2;
        }
        else return -1;
    }

    public function addPicture(Request $request)
    {
        //return $request;
        $U=User::where('id',$request->input('id'))->first();
            if(isset($U))
            {
                $image= $request->file('image');
                if(isset($image))
                {
                $imagename= time() . '.' . $image->getClientOriginalExtension();
                $destinationPath = public_path('/images');
                $image->move($destinationPath, $imagename);
                $U->ProfilePic=$imagename;
                $U->save();
                return 1;
                }
                else return -2;
            }
        //$id= Input::get('id');
        else return -1;
        // if(isset($id))
        // {
        //     $U=User::where('id',$id)->first();
        //     if(isset($U))
        //     {
        //         $image= $request->file('image');
        //         $input['imagename']= time()+ '.'+ $image->getClientOriginalExtension();
        //         $destinationPath = public_path('/images');
        //         $image->move($destinationPath, $input['imagename']);
        //         $U->ProfilePic=$input['imagename'];
        //         $U->save();
        //     }
        // }   
    }

    public function register(Request $request)
    {
        $U=User::where('Username',$request->input('Username'))
            ->first();

        if (isset($U)) 
        {
            return -2;
        }

        $U=User::where('Email',$request->input('Email'))
            ->first();

        if (isset($U)) 
        {
            return -3;
        }

        $user = new User();
        $user->FirstName = $request->input('FirstName');
        $user->LastName = $request->input('LastName');
        $user->Email = $request->input('Email');
        $user->Password = $request->input('Password');
        $user->Username = $request->input('Username');
        $user->DOB = $request->input('DOB');
        $user->ProfilePic = 'default.png';
        $user->save();
       
        $sub=array();
        $sub= $request->input('SubscriptionIDs');

        if(count($sub)>0)
        {
            foreach($sub as $n)
            {
                $user->subscriptions()->attach($n);
            }
            $user->save();
            // $image= $request->file('image');
            // $input['imagename']= time()+ '.'+ $image->getClientOriginalExtension();
            // $destinationPath = public_path('/images');
            // $image->move($destinationPath, $input['imagename']);
            //*****//sacuvaj picturePath
        }

        if(isset($user))
            return $user->id;
        else
            return -1;
    }
}
