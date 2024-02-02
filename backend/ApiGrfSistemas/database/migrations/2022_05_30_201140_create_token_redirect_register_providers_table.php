<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokenRedirectRegisterProvidersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('token_redirect_register_providers', function (Blueprint $table) {
            $table->id();
            $table->text('token');
            $table->text('clientId');
            $table->text('email');
            $table->text('avatar');
            $table->string('provider', 50);
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
        Schema::connection('mysqlMain')->dropIfExists('token_redirect_register_providers');
    }
}
