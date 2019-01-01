<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="{{asset('sass/app.scss')}}"  />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{config('app.name','Events')}}</title>       
    </head>
    <body>
        @include('inc.navbar')
        @yield('content')
    </body>
</html>
