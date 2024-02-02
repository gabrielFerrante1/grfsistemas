<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateComments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_system');
            $table->foreign('id_system')->references('id')->on('systems');
            $table->integer('id_user');
            $table->integer('stars');
            $table->string('body', 480)->nullable(true);
            $table->dateTime('date')->useCurrent(); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('comments');
    }
}
