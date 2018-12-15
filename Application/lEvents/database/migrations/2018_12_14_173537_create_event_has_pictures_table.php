<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEventHasPicturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('event_has_pictures', function (Blueprint $table) {
            $table->increments('EHPID');
            $table->integer('EventID')->references('EventID')->on('events');
            $table->integer('PictureID')->references('PictureID')->on('pictures'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('event_has_pictures');
    }
}
