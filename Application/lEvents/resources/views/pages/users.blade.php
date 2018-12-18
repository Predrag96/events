@extends('layouts.app')

@section('content')
    <h1>Welcome to Users page</h1>

    <h3>Users</h3>

    @if(count($users)>0)
        @foreach($users as $s)
            <div>
                <h5>{{$s->FirstName. " " .$s->LastName}}, teme na koje je subscribovan:</h5>

                @foreach($s->subscriptions as $u)
                <div>
                <h5>{{$u->SubName}}</h5>
                </div>
                @endforeach
            </div>
        @endforeach
    @else
        <p>No Users found</p>
    @endif

    <h3>Add new User</h3>
    {!! Form::Open(['action'=> 'UsersController@store', 'method' => 'POST' ]) !!}
        <div class= "form-group" >
            {{Form::label( 'firstname', 'FirstName')}}
            {{Form::text ('firstname', '', ['class'=> 'form-control', 'placeholder'=> 'FirstName'])}}

            {{Form::label( 'lastname', 'LastName')}}
            {{Form::text ('lastname', '', ['class'=> 'form-control', 'placeholder'=> 'LastName'])}}

            {{Form::label( 'email', 'Email')}}
            {{Form::text ('email', '', ['class'=> 'form-control', 'placeholder'=> 'Email'])}}

            {{Form::label( 'password', 'Password')}}
            {{Form::text ('password', '', ['class'=> 'form-control', 'placeholder'=> 'Password'])}}

            {{Form::label( 'username', 'Username')}}
            {{Form::text ('username', '', ['class'=> 'form-control', 'placeholder'=> 'Username'])}}

            {{Form::label( 'dob', 'DOB')}}
            {{Form::text ('dob', '', ['class'=> 'form-control', 'placeholder'=> 'DOB'])}}

            {{Form::label( 'profilepic', 'ProfilePic')}}
            {{Form::text ('profilepic', '', ['class'=> 'form-control', 'placeholder'=> 'ProfilePic'])}}
        </div>
        {{Form::submit('Submit', ['class'=> 'btn btn-primary'])}}
    {!! Form::close() !!}

@endsection