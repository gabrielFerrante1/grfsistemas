<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('users', function (Blueprint $table) {
            $table->id();
            $table->text('avatar')->default('default.png');
            $table->string('name', 70);
            $table->string('email')->unique();
            $table->string('password');
            $table->tinyInteger('verified_email')->default(0);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('users');
    }
}
