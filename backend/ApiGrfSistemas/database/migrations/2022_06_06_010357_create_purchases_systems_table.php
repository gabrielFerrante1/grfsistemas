<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesSystemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::connection('mysqlMain')->create('purchases_systems', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_init');
            $table->tinyInteger('repurchased')->default(0); 
            $table->unsignedBigInteger('id_purchase');
            $table->foreign('id_purchase')->references('id')->on('purchases')->onDelete('CASCADE');
            $table->unsignedBigInteger('id_system');
            $table->foreign('id_system')->references('id')->on('systems')->onDelete('CASCADE');
            $table->unsignedBigInteger('id_plan');
            $table->foreign('id_plan')->references('id')->on('plans')->onDelete('CASCADE'); 
            $table->unsignedBigInteger('id_user');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('CASCADE');
            $table->unsignedInteger('status_id');
            $table->foreign('status_id')->references('status')->on('status_payments')->onDelete('CASCADE'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::connection('mysqlMain')->dropIfExists('purchases_systems');
    }
}
