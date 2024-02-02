<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartSystems extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('cart_systems', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_cart');
            $table->foreign('id_cart')->references('id')->on('carts')->onDelete('CASCADE');
            $table->unsignedBigInteger('id_system');
            $table->foreign('id_system')->references('id')->on('systems')->onDelete('CASCADE');
            $table->unsignedBigInteger('id_plan');
            $table->foreign('id_plan')->references('id')->on('plans')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('cart_systems');
    }
}
