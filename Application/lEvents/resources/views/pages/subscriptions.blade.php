@extends('layouts.app')

@section('content')
    <h1>Welcome to subscriptions page</h1>

    <h3>Subscriptions</h3>
    @if(count($subs)>0)
        @foreach($subs as $s)
            <div>
                <h5>{{$s->SubName}}</h5>
            </div>
        @endforeach
    @else
        <p>No Subscriptions found</p>
    @endif

    <h3>Add new Subscription</h3>
    {!! Form::Open(['action'=> 'SubscriptionsController@store', 'method' => 'POST' ]) !!}
        <div class= "form-group" >
            {{Form::label( 'name', 'Name')}}
            {{Form::text ('name', '', ['class'=> 'form-control', 'placeholder'=> 'Name'])}}
        </div>
        {{Form::submit('Submit', ['class'=> 'btn btn-primary'])}}
    {!! Form::close() !!}

@endsection