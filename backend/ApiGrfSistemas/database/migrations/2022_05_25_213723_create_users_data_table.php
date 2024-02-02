<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersDataTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('users_data', function (Blueprint $table) {
            $table->id();
            $table->text('ip_origin')->nullable();
            $table->text('google_id')->nullable();
            $table->text('facebook_id')->nullable();
            $table->foreignIdFor(User::class)->references('id')->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('users_data');
    }
}
