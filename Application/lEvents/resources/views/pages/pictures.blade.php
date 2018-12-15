@extends('layouts.app')

@section('content')
    <h1>Welcome to Pictures page</h1>

    <h3>Picture paths</h3>
    @if(count($pics)>0)
        @foreach($pics as $s)
            <div>
                <h5>{{$s->PicturePath}}</h5>
            </div>
        @endforeach
    @else
        <p>No Pictures found</p>
    @endif

    <h3>Add new Picture</h3>
    {!! Form::Open(['action'=> 'PicturesController@store', 'method' => 'POST' ]) !!}
        <div class= "form-group" >
            {{Form::label( 'path', 'Path')}}
            {{Form::text ('path', '', ['class'=> 'form-control', 'placeholder'=> 'PicturePath'])}}
        </div>
        {{Form::submit('Submit', ['class'=> 'btn btn-primary'])}}
    {!! Form::close() !!}

@endsection