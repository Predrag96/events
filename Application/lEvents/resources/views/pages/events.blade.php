@extends('layouts.app')

@section('content')
    <h1>Welcome to Events page</h1>

    <h3>Event names</h3>
    @if(count($events)>0)
        @foreach($events as $s)
            <div>
                <h5>{{$s->EventName}}, ocene za ovaj event:</h5>                    
            </div>
            @foreach($s->userRatings as $u)
                    <div>
                    <h5>{{$u->pivot->Rating}}</h5>
                    </div>
            @endforeach
        @endforeach
    @else
        <p>No events found</p>
    @endif

    <h3>Add new Event</h3>
    {!! Form::Open(['action'=> 'EventsController@store', 'method' => 'POST' ]) !!}
        <div class= "form-group" >
            {{Form::label( 'name', 'Name')}}
            {{Form::text ('name', '', ['class'=> 'form-control', 'placeholder'=> 'Name'])}}
        </div>
        <div class= "form-group" >
            {{Form::label( 'city', 'City')}}
            {{Form::text ('city', '', ['class'=> 'form-control', 'placeholder'=> 'City'])}}
        </div>
        <div class= "form-group" >
            {{Form::label( 'location', 'Location')}}
            {{Form::text ('location', '', ['class'=> 'form-control', 'placeholder'=> 'Location'])}}
        </div>
        <div class= "form-group" >
            {{Form::label( 'time', 'Time')}}
            {{Form::text ('time', '', ['class'=> 'form-control', 'placeholder'=> 'Time'])}}
        </div>
        {{Form::submit('Submit', ['class'=> 'btn btn-primary'])}}
    {!! Form::close() !!}

@endsection