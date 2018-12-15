<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('EventID');
            $table->string('EventName');
            $table->integer('SubID')->references('SubscriptionID')->on('subscriptions');
            $table->integer('UserID')->references('UserID')->on('users');
            $table->string('City');
            $table->string('Location');
            $table->string('Time');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('events');
    }
}
