<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserHasSubscriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_has_subscriptions', function (Blueprint $table) {
            $table->increments('UHSID');
            $table->integer('UID')->references('UserID')->on('users');
            $table->integer('SubID')->references('SubscriptionID')->on('subscriptions');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_has_subscriptions');
    }
}
