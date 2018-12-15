<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'PagesController@index');
Route::get('/subscriptions','PagesController@subscriptions');

Route::resource('users', 'UsersController');
Route::resource('comments', 'CommentsController');
Route::resource('conversations', 'ConversationsController');
Route::resource('coversation_replies', 'ConversationRepliesController');

Route::resource('events', 'EventsController');
Route::resource('event_has_pictures', 'EventHasPicturesController');
Route::resource('pictures', 'PicturesController');
Route::resource('subscriptions', 'SubscriptionsController');
Route::resource('user_has_subscriptions', 'UserHasSubscriptionsController');
