<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', ['uses' => 'UsersController@login']);
Route::post('/register', ['uses' => 'UsersController@register']);
Route::get('/allu', ['uses' => 'UsersController@index']);
Route::post('/reg', ['uses' => 'UsersController@reg']);
Route::get('/allsubscr', ['uses' => 'SubscriptionsController@index']);


Route::middleware('auth:api')->get('/user', function (Request $request) {return $request->user();});