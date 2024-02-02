<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsDislikesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('comments_dislikes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_comment');
            $table->foreign('id_comment')->references('id')->on('comments')->onDelete('CASCADE');
            $table->integer('id_user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('comments_dislikes');
    }
}