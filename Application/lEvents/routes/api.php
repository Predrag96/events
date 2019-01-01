<?php

use Illuminate\Http\Request;
Route::middleware('auth:api')->get('/user', function (Request $request) {return $request->user();});



//Users
Route::get('/allusers', ['uses' => 'UsersController@index']);
Route::get('/allu', ['uses' => 'UsersController@userdetails']);

Route::post('/login', ['uses' => 'UsersController@login']);
Route::post('/register', ['uses' => 'UsersController@register']);
Route::post('/reg', ['uses' => 'UsersController@reg']);
Route::post('/getbyname', ['uses' => 'UsersController@getbyname']);
Route::post('/addpicture', ['uses' => 'UsersController@addPicture']);
Route::post('/changepicture', ['uses' => 'UsersController@changePicture']);

Route::put('/changepassword', ['uses' => 'UsersController@changePassword']);

Route::delete('/deleteuser', ['uses' => 'UsersController@deleteUser']);

//Events
Route::get('/allevents', ['uses' => 'EventsController@alle']);

Route::post('/getFiltered', ['uses' => 'EventsController@filteredEvents']);
Route::post('/addevent', ['uses' => 'EventsController@addEvent']);
Route::post('/addcomment', ['uses' => 'EventsController@addcomment']);

Route::put('/addrating', ['uses' => 'EventsController@addrating']);

//Subscriptions 
Route::get('/subscriptions', ['uses' => 'SubscriptionsController@allSubscriptions']);

Route::post('/changesubs', ['uses' => 'SubscriptionsController@changeSubs']);
Route::post('/addsub', ['uses' => 'SubscriptionsController@addSub']);

//Pictures
Route::get('/allp', ['uses' => 'PicturesController@allp']);
Route::post('/addpic', ['uses' => 'PicturesController@addpic']);